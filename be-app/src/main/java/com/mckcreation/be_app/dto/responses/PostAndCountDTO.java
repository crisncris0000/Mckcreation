package com.mckcreation.be_app.dto.responses;
import com.mckcreation.be_app.model.Post;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PostAndCountDTO {

    List<Post> postList;

    int count;
}
