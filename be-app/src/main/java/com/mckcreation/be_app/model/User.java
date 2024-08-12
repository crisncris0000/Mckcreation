package com.mckcreation.be_app.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "\"user\"")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    @Column(name = "first_name")
    String firstName;

    @Column(name = "last_name")
    String lastName;

    @Column(name = "email")
    String email;

    @Column(name = "password")
    String password;

    @Column(name = "is_admin")
    Boolean isAdmin;

    @Column(name = "created_at")
    Date createdAt;

    @Column(name = "updated_at")
    Date updatedAt;
}
