package com.mckcreation.be_app.service.impl;

import com.mckcreation.be_app.dto.ShippingDTO;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.repository.ShippingRepository;
import com.mckcreation.be_app.service.ShippingService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class ShippingServiceImpl implements ShippingService {

    ShippingRepository shippingRepository;

    @Autowired
    public ShippingServiceImpl(ShippingRepository shippingRepository) {
        this.shippingRepository = shippingRepository;
    }
    @Override
    public Shipping getUserShipping(int userID) {

        Optional<Shipping> optionalShipping = shippingRepository.findUserShipping(userID);

        return optionalShipping.orElseThrow(() ->
                new EntityNotFoundException("Entity not found"));
    }

    @Override
    public Shipping updateUserShipping(int id, ShippingDTO shippingDTO) {

        Optional<Shipping> optionalShipping = shippingRepository.findById(id);

        Shipping shipping = optionalShipping.orElseThrow(() ->
                new EntityNotFoundException("Shipping info not found"));

        shipping.setAddress(shippingDTO.getAddress());
        shipping.setCity(shippingDTO.getCity());
        shipping.setState(shippingDTO.getState());
        shipping.setZipCode(shippingDTO.getZipCode());

        return shippingRepository.save(shipping);
    }
}
