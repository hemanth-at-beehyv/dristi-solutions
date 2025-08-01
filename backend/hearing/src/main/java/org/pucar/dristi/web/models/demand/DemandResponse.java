package org.pucar.dristi.web.models.demand;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.egov.common.contract.response.ResponseInfo;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DemandResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("Demands")
    private List<Demand> demands = new ArrayList<>();

    @JsonProperty("CollectedReceipt")
    private List<CollectedReceipt> collectedReceipts;

    public DemandResponse(ResponseInfo responseInfo, List<Demand> demands) {
        this.responseInfo = responseInfo;
        this.demands = demands;
    }
}
