package org.pucar.dristi.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProcessInstanceResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo = null;

    @JsonProperty("ProcessInstances")
    @Valid
    private List<ProcessInstance> processInstances = null;

    @JsonProperty("totalCount")
    @Valid
    private Integer totalCount = null;

    public ProcessInstanceResponse addProceInstanceItem(ProcessInstance proceInstanceItem) {
        if (this.processInstances == null) {
            this.processInstances = new ArrayList<>();
        }
        this.processInstances.add(proceInstanceItem);
        return this;
    }

}
