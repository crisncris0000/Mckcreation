package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.dto.MailDTO;
import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.service.EmailService;
import com.mckcreation.be_app.service.UserService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    UserService userService;

    EmailService emailService;

    @Autowired
    public UserController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserByID(@PathVariable int id) {

        User user = userService.getUserByID(id);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();

        System.out.println(users);

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody UserDTO userDTO) {

        userService.updateUser(id, userDTO);

        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PutMapping("/update-password/{id}")
    public ResponseEntity<?> updateUserPassword(@PathVariable int id, @RequestBody UserDTO userDTO) {

        try{
            userService.updateUserPassword(id, userDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", "Old password does not match"), HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(Map.of("message", "Updated successfully!"), HttpStatus.OK);
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody MailDTO mailDTO) {

        emailService.sendEmail(mailDTO.getEmail(), mailDTO.getSubject(), mailDTO.getBody());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
