package com.mckcreation.be_app.model;

import jakarta.persistence.*;
import lombok.*;

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
    int id;

    @Column(name = "title")
    String title;

    @Column(name = "image_data")
    byte[] imageData;

    @Column(name = "price")
    float price;

    @Column(name = "mime_type")
    String mimeType;
}
