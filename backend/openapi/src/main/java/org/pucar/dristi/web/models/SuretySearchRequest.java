package org.pucar.dristi.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.egov.common.contract.request.RequestInfo;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SuretySearchRequest {
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;
    @JsonProperty("criteria")
    private SuretyCriteria criteria;
}
