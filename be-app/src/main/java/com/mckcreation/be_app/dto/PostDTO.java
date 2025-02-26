package com.mckcreation.be_app.dto;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PostDTO {

    MultipartFile imageData;

    String mimeType;

}
