package com.mckcreation.be_app.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "shipping")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Shipping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    long id;

    @Column(name = "address")
    String address;

    @Column(name = "state")
    String state;

    @Column(name = "city")
    String city;

    @Column(name = "zip_code")
    int zipCode;

}
