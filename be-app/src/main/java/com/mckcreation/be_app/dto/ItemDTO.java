package com.mckcreation.be_app.dto;
import jakarta.persistence.Column;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ItemDTO {

    int id;

    String title;

    byte[] imageData;

    String mimeType;

    float price;
}
