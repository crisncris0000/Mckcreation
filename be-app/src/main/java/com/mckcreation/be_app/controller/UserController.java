package com.mckcreation.be_app.controller;

import com.mckcreation.be_app.dto.MailDTO;
import com.mckcreation.be_app.dto.UserDTO;
import com.mckcreation.be_app.dto.UserShippingDTO;
import com.mckcreation.be_app.model.User;
import com.mckcreation.be_app.service.EmailService;
import com.mckcreation.be_app.service.UserService;
import org.apache.coyote.Response;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;

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

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/recent/{count}")
    public ResponseEntity<?> getRecentUsers(@PathVariable int count) {
        return new ResponseEntity<>(userService.getRecentUsers(count), HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        User user = userService.getUserByEmail(email);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/get-user-shipping/{id}")
    public ResponseEntity<?> getUserAndShipping(@PathVariable int id) {
        UserShippingDTO userShippingDTO = userService.getUserAndShipping(id);

        return new ResponseEntity<>(userShippingDTO, HttpStatus.OK);
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
            return new ResponseEntity<>(Map.of("error", "Old password does not match"),
                    HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(Map.of("message", "Updated successfully!"), HttpStatus.OK);
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> updateUserPassword(@RequestBody UserDTO userDTO) {

        userService.updateUserPassword(userDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody MailDTO mailDTO) {

        emailService.sendEmail(mailDTO.getEmail(), mailDTO.getSubject(), mailDTO.getBody());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/reset/{email}")
    public ResponseEntity<?> sendResetPassword(@PathVariable String email) {

        User user = userService.getUserByEmail(email);

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Random random = new Random();

        int randomCode = random.nextInt(999999) + 100000;

        emailService.sendEmail(email, "Reset Request",
                "Here is your 6 digit code to reset your password: " + randomCode);

        return new ResponseEntity<>(randomCode, HttpStatus.OK);
    }
}
