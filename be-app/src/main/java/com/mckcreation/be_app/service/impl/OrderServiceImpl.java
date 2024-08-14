package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.OrderDTO;
import com.mckcreation.be_app.model.Category;
import com.mckcreation.be_app.model.Order;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.CategoryRepository;
import com.mckcreation.be_app.repository.OrderRepository;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.OrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private UserRepository userRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, UserRepository userRepository,
                            CategoryRepository categoryRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Order createUserOrder(OrderDTO orderDTO) {

        Optional<User> optionalUser = userRepository.findById((int) orderDTO.getUserID());

        User user = optionalUser.orElseThrow(() -> new EntityNotFoundException("User not found"));

        Optional<Category> optionalCategory = categoryRepository.findById((int) orderDTO.getCategoryID());

        Category category = optionalCategory.orElseThrow(() -> new EntityNotFoundException("Category not found"));

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        Order order = Order.builder()
                .customize(orderDTO.getCustomize())
                .price(orderDTO.getPrice())
                .category(category)
                .user(user)
                .createdAt(timestamp)
                .updatedAt(timestamp)
                .build();

        return orderRepository.save(order);
    }

    @Override
    public List<Order> getUserOrders(long id) {
        return orderRepository.getUserOrders((int) id);
    }

    @Override
    public void deleteOrder(long orderID, long userID) {
        orderRepository.deleteOrder((int) orderID, (int) userID);
    }
}
