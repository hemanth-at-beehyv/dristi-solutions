package org.egov.transformer.models.inbox;

import com.fasterxml.jackson.annotation.JsonProperty;
import digit.models.coremodels.Action;
import digit.models.coremodels.AuditDetails;
import digit.models.coremodels.Document;
import digit.models.coremodels.State;
import lombok.*;
import org.egov.common.contract.request.User;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = {"id"})
@ToString
public class ProcessInstance   {

    @Size(max=64)
    @JsonProperty("id")
    private String id;

    @NotNull
    @Size(max=128)
    @JsonProperty("tenantId")
    private String tenantId;

    @NotNull
    @Size(max=128)
    @JsonProperty("businessService")
    private String businessService;

    @NotNull
    @Size(max=128)
    @JsonProperty("businessId")
    private String businessId;

    @NotNull
    @Size(max=128)
    @JsonProperty("action")
    private String action;

    @NotNull
    @Size(max=64)
    @JsonProperty("moduleName")
    private String moduleName;

    @JsonProperty("state")
    private State state;

    @JsonProperty("comment")
    private String comment;

    @JsonProperty("documents")
    @Valid
    private List<Document> documents;

    @JsonProperty("assigner")
    private User assigner;

    @JsonProperty("assignes")
    private List<User> assignes;

    @JsonProperty("nextActions")
    @Valid
    private List<Action> nextActions;

    @JsonProperty("stateSla")
    private Long stateSla;

    @JsonProperty("businesssServiceSla")
    private Long businesssServiceSla;

    @JsonProperty("previousStatus")
    @Size(max=128)
    private String previousStatus;

    @JsonProperty("entity")
    private Object entity;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("rating")
    private Integer rating;

    @JsonProperty("assignee")
    private User assignee;

    @JsonProperty("escalated")
    private boolean escalated;

    public ProcessInstance addDocumentsItem(Document documentsItem) {
        if (this.documents == null) {
            this.documents = new ArrayList<>();
        }
        if(!this.documents.contains(documentsItem))
            this.documents.add(documentsItem);

        return this;
    }

    public ProcessInstance addNextActionsItem(Action nextActionsItem) {
        if (this.nextActions == null) {
            this.nextActions = new ArrayList<>();
        }
        this.nextActions.add(nextActionsItem);
        return this;
    }

}

