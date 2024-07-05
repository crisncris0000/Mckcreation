package com.mckcreation.be_app.Controller;

import com.mckcreation.be_app.Model.User;
import com.mckcreation.be_app.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;

@RestController
@RequestMapping("/api/user")
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/new")
    public ResponseEntity<String> createUser(@RequestBody User user) {

        if(userService.userExists(user.getEmail())) {
            return new ResponseEntity<>("User already exists",HttpStatus.NOT_ACCEPTABLE);
        }

        Date date = new Date();
        Timestamp timestamp = new Timestamp(date.getTime());

        user.setCreatedAt(timestamp);
        user.setUpdatedAt(timestamp);

        userService.saveUser(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
