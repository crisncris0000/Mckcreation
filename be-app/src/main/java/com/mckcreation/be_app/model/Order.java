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
    long id;

    @Column(name = "item_title")
    String itemTitle;

    @Column(name = "customization")
    String customization;

    @Column(name = "price")
    float price;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    Category category;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    User user;

    @Column(name = "created_at")
    Date createdAt;

    @Column(name = "updated_at")
    Date updatedAt;

}
