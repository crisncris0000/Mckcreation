package com.mckcreation.be_app.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "\"order\"")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    @Column(name = "customize")
    String customize;

    @Column(name = "price")
    float price;

    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "categoryID", referencedColumnName = "id")
    Category category;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "userID", referencedColumnName = "id")
    User user;

    @Column(name = "created_at")
    Date createdAt;

    @Column(name = "updated_aat")
    Date updatedAt;

}
