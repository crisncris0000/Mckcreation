package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.ShippingDTO;
import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.repository.ShippingRepository;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.service.ShippingService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ShippingServiceImpl implements ShippingService {

    ShippingRepository shippingRepository;

    UserRepository userRepository;

    @Autowired
    public ShippingServiceImpl(ShippingRepository shippingRepository, UserRepository userRepository) {
        this.shippingRepository = shippingRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Shipping createShipping(UserDTO userDTO, User user) {

        Shipping shipping = Shipping.builder()
                .address(userDTO.getAddress())
                .state(userDTO.getState())
                .city(userDTO.getCity())
                .zipCode(userDTO.getZipCode())
                .user(user)
                .build();

        return shippingRepository.save(shipping);
    }

    @Override
    public Shipping getUserShipping(int userID) {

        Optional<Shipping> optionalShipping = shippingRepository.findUserShipping(userID);

        return optionalShipping.orElseThrow(() ->
                new EntityNotFoundException("Entity not found"));
    }

    @Override
    public Shipping saveOrUpdateUserShipping(ShippingDTO shippingDTO) {

        Optional<Shipping> optionalShipping = shippingRepository.findUserShipping(shippingDTO.getUserID());

        Shipping shipping;

        if(optionalShipping.isPresent()) {
            shipping = optionalShipping.get();
        } else {
            shipping = new Shipping();

            Optional<User> optionalUser = userRepository.findById(shippingDTO.getUserID());

            User user = optionalUser.orElseThrow(() ->
                    new EntityNotFoundException("Cannot find user"));

            shipping.setUser(user);
        }

        shipping.setAddress(shippingDTO.getAddress());
        shipping.setCity(shippingDTO.getCity());
        shipping.setState(shippingDTO.getState());
        shipping.setZipCode(shippingDTO.getZipCode());

        return shippingRepository.save(shipping);
    }
}
