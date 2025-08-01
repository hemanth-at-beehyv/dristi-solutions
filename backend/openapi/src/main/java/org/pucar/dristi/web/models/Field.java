package org.pucar.dristi.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Field {

    @JsonProperty("key")
    private String key;

    @JsonProperty("value")
    private Object value;

}
