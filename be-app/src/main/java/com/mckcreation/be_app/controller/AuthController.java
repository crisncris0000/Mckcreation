package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.dto.AuthenticationRequest;
import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.security.service.JwtService;
import com.mckcreation.be_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    UserService userService;
    AuthenticationManager authenticationManager;
    JwtService jwtService;
    UserDetailsService userDetailsService;

    @Autowired
    public AuthController(UserService userService, AuthenticationManager authenticationManager,
                          JwtService jwtService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {

        if(userService.userExists(userDTO.getEmail().toLowerCase())) {
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        userService.createUser(userDTO);

        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthenticationRequest authRequest) {

        String jwtToken = null;
        try {

            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail().toLowerCase(), authRequest.getPassword())
            );

            User user = (User) auth.getPrincipal();

            jwtToken = jwtService.generateToken(Map.of(
                    "id", user.getId(),
                    "firstName", user.getFirstName(),
                    "lastName", user.getLastName()
            ), user);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(Map.of("message","Invalid credentials"), HttpStatus.NOT_ACCEPTABLE);
        }

        return new ResponseEntity<>(Map.of("token", jwtToken), HttpStatus.OK);
    }

}
