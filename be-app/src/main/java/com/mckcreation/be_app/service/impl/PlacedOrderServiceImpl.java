package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.OrderDTO;
import com.mckcreation.be_app.dto.PlacedOrderDTO;
import com.mckcreation.be_app.model.PlacedOrder;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.OrderRepository;
import com.mckcreation.be_app.repository.PlacedOrderRepository;
import com.mckcreation.be_app.repository.ShippingRepository;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.EmailService;
import com.mckcreation.be_app.service.PlacedOrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class PlacedOrderServiceImpl implements PlacedOrderService {

    PlacedOrderRepository placedOrderRepository;
    OrderRepository orderRepository;
    ShippingRepository shippingRepository;
    UserRepository userRepository;

    EmailService emailService;

    @Autowired
    public PlacedOrderServiceImpl(PlacedOrderRepository placedOrderRepository, ShippingRepository shippingRepository,
                                  UserRepository userRepository, OrderRepository orderRepository, EmailService emailService) {
       this.placedOrderRepository = placedOrderRepository;
       this.shippingRepository = shippingRepository;
       this.userRepository = userRepository;
       this.orderRepository = orderRepository;
       this.emailService = emailService;
    }

    public PlacedOrder createPlacedOrder(PlacedOrderDTO placedOrderDTO, boolean useDefaultAddress) {

        User user = userRepository.findById(placedOrderDTO.getUserID())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Shipping shipping = useDefaultAddress
                ? shippingRepository.getUserShipping(placedOrderDTO.getUserID())
                .orElseThrow(() -> new EntityNotFoundException("Shipping address not found"))
                : shippingRepository.save(Shipping.builder()
                .address(placedOrderDTO.getShippingDTO().getAddress())
                .city(placedOrderDTO.getShippingDTO().getCity())
                .state(placedOrderDTO.getShippingDTO().getState())
                .zipCode(placedOrderDTO.getShippingDTO().getZipCode())
                .build());

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        PlacedOrder placedOrder = PlacedOrder.builder()
                .orderDetails(placedOrderDTO.getDetails())
                .total(placedOrderDTO.getTotal())
                .status(placedOrderDTO.getStatus())
                .shipping(shipping)
                .user(user)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        PlacedOrder savedPlacedOrder = placedOrderRepository.save(placedOrder);

        orderRepository.deleteUserOrders(user.getId());

        emailService.sendEmail(
                savedPlacedOrder.getUser().getEmail(),
                "Your Order Confirmation",
                buildOrderConfirmationEmail(placedOrderDTO)
        );

        return savedPlacedOrder;
    }


    @Override
    public List<PlacedOrder> getPlacedOrders() {
        return placedOrderRepository.findAll();
    }

    @Override
    public List<PlacedOrder> getAllUserPlacedOrders(int id) {
        return placedOrderRepository.findAllUserPlacedOrders(id);
    }

    @Override
    public List<PlacedOrder> getAmountOfUserPlacedOrders(long id, int page, int size) {
        return List.of();
    }

    private String buildOrderConfirmationEmail(PlacedOrderDTO order) {

        String formattedItems = formatItems(order.getDetails());

        return """
        Thank you for your order!

        Order Details:
        -----------------------
        %s
        Total: $%.2f
        Status: %s

        Shipping Information:
        -----------------------
        Address: %s
        City: %s
        State: %s
        Zip Code: %s

        We appreciate your business.
        McKCreation Team
        """.formatted(
                formattedItems,
                order.getTotal() / 100.0,
                order.getStatus(),
                order.getShippingDTO().getAddress(),
                order.getShippingDTO().getCity(),
                order.getShippingDTO().getState(),
                order.getShippingDTO().getZipCode()
        );
    }

    private String formatItems(String rawItems) {
        // Remove the surrounding brackets [   ]
        String cleaned = rawItems.substring(1, rawItems.length() - 1);

        // Split by "OrderDTO(" occurrences
        String[] itemBlocks = cleaned.split("OrderDTO\\(");

        StringBuilder sb = new StringBuilder();
        int index = 1;

        for (String block : itemBlocks) {
            if (block.trim().isEmpty()) continue;

            // Remove ending ")" and any trailing commas
            block = block.replace(")", "").trim();
            if (block.endsWith(",")) block = block.substring(0, block.length() - 1);

            // Split fields: itemTitle=..., customization=..., price=...
            String[] fields = block.split(", ");

            String title = "", customization = "", price = "";

            for (String field : fields) {
                if (field.startsWith("itemTitle=")) {
                    title = field.replace("itemTitle=", "");
                } else if (field.startsWith("customization=")) {
                    customization = field.replace("customization=", "");
                } else if (field.startsWith("price=")) {
                    price = field.replace("price=", "");
                }
            }

            sb.append(String.format(
                    "Item %d:\n  - Title: %s\n  - Customization: %s\n  - Price: $%s\n\n",
                    index++, title, customization, price
            ));
        }

        return sb.toString();
    }

}
