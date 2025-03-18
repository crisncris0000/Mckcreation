package com.mckcreation.be_app.service;

import com.mckcreation.be_app.dto.ShippingDTO;
import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.model.Shipping;
import com.mckcreation.be_app.model.User;

public interface ShippingService {

    Shipping createShipping(UserDTO userDTO, User user);

    Shipping getUserShipping(int userID);

    Shipping saveOrUpdateUserShipping(ShippingDTO shippingDTO);
}
