package digit.config;


import lombok.*;
import org.egov.tracer.config.TracerConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@Data
@Import({TracerConfiguration.class})
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Configuration {

    @Value("${drishti.scheduler.hearing}")
    private String scheduleHearingTopic;

    @Value("${drishti.scheduler.opt-out}")
    private String optOutTopic;

    @Value("${drishti.scheduler.opt-out.update}")
    private String optOutUpdateTopic;

    @Value("${drishti.scheduler.hearing.update}")
    private String scheduleHearingUpdateTopic;

    @Value("${drishti.scheduler.hearing.reschedule}")
    private String rescheduleRequestCreateTopic;

    @Value("${drishti.judge.calendar.update}")
    private String updateJudgeCalendarTopic;

    @Value("${drishti.causelist.insert}")
    private String causeListInsertTopic;

    @Value("${causelist.pdf.template.key}")
    private String causeListPdfTemplateKey;

    @Value("${async.submission.insert}")
    private String asyncSubmissionSaveTopic;

    @Value("${async.submission.update}")
    private String asyncSubmissionUpdateTopic;

    @Value("${async.reschedule.hearing}")
    private String asyncSubmissionReScheduleHearing;

    @Value("${min.async.submission.days}")
    private Integer minAsyncSubmissionDays;

    @Value("${min.async.response.days}")
    private Integer minAsyncResponseDays;
    @Value("${drishti.scheduler.hearing.reschedule.update}")
    private String updateRescheduleRequestTopic;

    //Tenant Id
    @Value("${egov-state-level-tenant-id}")
    private String egovStateTenantId;

    // User Config
    @Value("${egov.user.host}")
    private String userHost;

    @Value("${egov.user.context.path}")
    private String userContextPath;

    @Value("${egov.user.create.path}")
    private String userCreateEndpoint;

    @Value("${egov.user.search.path}")
    private String userSearchEndpoint;

    @Value("${egov.user.update.path}")
    private String userUpdateEndpoint;


    //Idgen Config
    @Value("${egov.idgen.host}")
    private String idGenHost;

    @Value("${egov.idgen.path}")
    private String idGenPath;


    // id format
    @Value("${drishti.idgen.hearing.id.format}")
    private String hearingIdFormat;

    @Value("${drishti.idgen.reschedule.id.format}")
    private String rescheduleHearingIdFormat;

    // id format
    @Value("${drishti.idgen.async.submission.id.format}")
    private String asyncSubmissionIdFormat;

    //Workflow Config
    @Value("${egov.workflow.host}")
    private String wfHost;

    @Value("${egov.workflow.transition.path}")
    private String wfTransitionPath;

    @Value("${egov.workflow.businessservice.search.path}")
    private String wfBusinessServiceSearchPath;

    @Value("${egov.workflow.processinstance.search.path}")
    private String wfProcessInstanceSearchPath;


    //MDMS
    @Value("${egov.mdms.host}")
    private String mdmsHost;

    @Value("${egov.mdms.search.endpoint}")
    private String mdmsEndPoint;

    @Value("${egov.mdms.v2.search.endpoint}")
    private String mdmsV2EndPoint;

    @Value("${egov.mdms.update.endpoint}")
    private String mdmsUpdateEndPoint;

    //SMSNotification
    @Value("${egov.sms.notification.topic}")
    private String smsNotificationTopic;


    //Due date of hearing
    @Value("${drishti.opt-out.due.days}")
    private Long optOutDueDate;

    //date before reschedule request can be raised
    @Value("${drishti.reschedule.before.date}")
    private Long rescheduleRequestDueDate;

    //Pdf Services
    @Value("${egov.pdf.service.host}")
    private String pdfServiceHost;

    @Value("${egov.pdf.service.create.endpoint}")
    private String pdfServiceEndpoint;

    //CaseCriteria
    @Value("${drishti.case.host}")
    private String caseUrl;

    @Value("${drishti.case.endpoint}")
    private String caseEndpoint;

    @Value("${drishti.case.count.endpoint}")
    private String caseCountEndpoint;

    @Value("${case.statuses.after.payment}")
    private List<String> caseStatusesAfterPayment;

    @Value("${case.statuses.after.registration}")
    private List<String> caseStatusesAfterRegistration;

    @Value("${case.disposed.statuses}")
    private List<String> caseStatusesDisposed;

    @Value("${drishti.opt-out.selection.limit}")
    private Long optOutLimit;

    @Value("${drishti.analytics.host}")
    private String analyticsHost;

    @Value("${drishti.analytics.endpoint}")
    private String analyticsEndpoint;

    //Hearing config
    @Value("${dristhi.hearing.host}")
    private String HearingHost;

    @Value("${drishti.hearingupdate.endpoint}")
    private String HearingUpdateEndPoint;

    @Value("${drishti.hearing.search.endpoint}")
    private String hearingSearchEndPoint;

    @Value("${drishti.hearing.update.endpoint}")
    private String hearingsUpdateEndPoint;

    @Value("${drishti.no.of.days.to.hearing.endpoint}")
    private String daysToHearingEndPoint;

    @Value("${app.zone.id}")
    private String zoneId;

    @Value("${drishti.judge.pending.due.days}")
    private Long judgePendingSla;

    @Value("${order.businessservice}")
    private String orderEntityType;

    //Application Config
    @Value("${dristi.application.host}")
    private String applicationHost;

    @Value("${dristi.application.search.endpoint}")
    private String applicationSearchEndpoint;

    // Filestore Config
    @Value("${egov.filestore.host}")
    private String fileStoreHost;

    @Value("${egov.file.store.save.endpoint}")
    private String fileStoreSaveEndPoint;

    @Value("${egov.filestore.path}")
    private String fileStorePath;

    @Value("${egov.filestore.causelist.module}")
    private String fileStoreCauseListModule;

    @Value("${causelist.pdf.save.topic}")
    private String causeListPdfTopic;

    //court details
    @Value("${court.id}")
    private String courtId;

    @Value("${court.name}")
    private String courtName;

    @Value("${court.enabled}")
    private Boolean courtEnabled;

    @Value("${judge.name}")
    private String judgeName;

    @Value("${judge.designation}")
    private String judgeDesignation;


    @Value("${egov.advocate.host}")
    private String advocateHost;

    @Value("${egov.advocate.path}")
    private String advocatePath;

    //individual
    @Value("${egov.individual.host}")
    private String individualHost;

    @Value("${egov.individual.search.path}")
    private String individualSearchEndpoint;

    //Localization
    @Value("${egov.localization.host}")
    private String localizationHost;

    @Value("${egov.localization.context.path}")
    private String localizationContextPath;

    @Value("${egov.localization.search.endpoint}")
    private String localizationSearchEndpoint;

    @Value("${egov.sms.notification.hearing.reminder.template.id}")
    private String smsNotificationHearingReminder;

    @Value("${hearing.expiry.interval.miliseconds}")
    private Integer expiryIntervalMiliSeconds;

    @Value("${cause.list.cutoff.time}")
    private String cutoffTime;

    @Value("${email.topic}")
    private String emailTopic;

    @Value("${email.cause.list.subject}")
    private String causeListSubject;

    @Value("${email.cause.list.recipients}")
    private String causeListRecipients;

    @Value("${drishti.hearing.retry.update.time.topic}")
    private String retryHearingUpdateTimeTopic;

    @Value("${hearing.retry.delay.ms:60000}")
    private Long hearingRetryDelayMs;

    // landing page mdms schema code
    @Value("${egov.landing.page.metrics.schema.code}")
    private String landingPageMetricsSchemaCode;

    @Value("${egov.indexer.es.username}")
    private String esUsername;

    @Value("${egov.indexer.es.password}")
    private String esPassword;

    @Value("${egov.bulk.index}")
    private String index;

    @Value("${egov.infra.indexer.host}")
    private String esHostUrl;

    @Value("${egov.bulk.index.path}")
    private String bulkPath;

    // inbox config
    @Value("${egov.inbox.host}")
    private String inboxHost;

    @Value("${egov.inbox.search.endpoint}")
    private String indexSearchEndPoint;
}
