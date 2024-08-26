package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.ShippingDTO;
import com.mckcreation.be_app.model.Shipping;

public interface ShippingService {

    Shipping getUserShipping(int userID);

    Shipping updateUserShipping(int id, ShippingDTO shippingDTO);
}
