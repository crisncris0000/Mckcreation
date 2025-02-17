package com.mckcreation.be_app.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "item")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    long id;

    @Column(name = "title")
    String title;

    @Column(name = "image_data")
    byte[] imageData;

    @Column(name = "mime_type")
    String mimeType;

    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    Category category;

    @Column(name = "price")
    float price;

    @Column(name = "created_at")
    Date createdAt;

    @Column(name = "updated_at")
    Date updatedAt;
}
