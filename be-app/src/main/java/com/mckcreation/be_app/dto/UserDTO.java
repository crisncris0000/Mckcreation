package com.mckcreation.be_app.dto;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserDTO {

    String firstName;

    String lastName;

    String email;

    String oldPassword;

    String password;

    Boolean isAdmin;
}
