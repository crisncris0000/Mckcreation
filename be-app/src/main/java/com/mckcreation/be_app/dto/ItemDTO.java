package com.mckcreation.be_app.dto;
import jakarta.persistence.Column;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ItemDTO {

    long id;

    String title;

    MultipartFile imageData;

    String mimeType;

    float price;

    String selectedCategory;
}
