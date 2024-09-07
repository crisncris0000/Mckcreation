package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.dto.LoginRequest;
import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.repository.UserRepository;
import com.mckcreation.be_app.security.service.JwtService;
import com.mckcreation.be_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    UserService userService;
    AuthenticationManager authenticationManager;
    JwtService jwtService;
    UserDetailsService userDetailsService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {

        if(userService.userExists(userDTO.getEmail())) {
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        userService.createUser(userDTO);

        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        String jwtToken = null;
        try {

            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            UserDetails user = (UserDetails) auth.getPrincipal();
            jwtToken = jwtService.generateToken(user);

        } catch (Exception e) {
            return new ResponseEntity<>("Invalid credentials",HttpStatus.NOT_ACCEPTABLE);
        }

        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
    }

}
