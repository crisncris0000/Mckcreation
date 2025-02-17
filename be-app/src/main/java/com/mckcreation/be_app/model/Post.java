package com.mckcreation.be_app.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "post")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    long id;

    @Column(name = "image_data")
    byte[] imageData;

    @Column(name = "mime_type")
    String mimeType;

}
