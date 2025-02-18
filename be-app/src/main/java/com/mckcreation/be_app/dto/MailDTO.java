package com.mckcreation.be_app.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class MailDTO {

    String name;

    String email;

    String subject;

    String body;

}
