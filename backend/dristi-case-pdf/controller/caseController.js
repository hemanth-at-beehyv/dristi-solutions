const caseService = require("../service/caseService");
const pdfService = require("../service/pdfService");
const fileService = require("../service/fileService");
const config = require("../config/config");
const { DocumentError } = require("../util/errorUtils");
const { htmlToFormattedText } = require("../util/htmlToFormattedText");

/**
 * Generates a PDF document for a case.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.generateCasePdf = async (req, res, next) => {
  try {
    const requestInfo = req?.body?.RequestInfo;

    const caseData = req?.body?.cases;

    const courtName = config?.courtName;
    const place = config?.courtPlace;
    const filingNumber = caseData?.filingNumber;

    const complainants =
      caseService.getComplainantsDetailsForComplaint(caseData);
    const accuseds = caseService.getRespondentsDetailsForComplaint(caseData);
    const advocates = caseService.getAdvocateDetailsForComplainant(caseData);
    const prayer = await caseService.getPrayerSwornStatementDetails(
      caseData
    )?.[0]?.prayer;
    const complaint = htmlToFormattedText(
      caseService.getPrayerSwornStatementDetails(caseData)?.[0]
        ?.memorandumOfComplaintText
    );

    const dateOfFiling = caseService.formatDate(
      caseData?.filingDate ? new Date(caseData?.filingDate) : new Date()
    );
    const documentList = caseService.getDocumentList(caseData);
    const witnessScheduleList =
      caseService.getWitnessDetailsForComplaint(caseData);

    const chequeDetails = caseService.getChequeDetails(caseData);
    const debtLiabilityDetails = caseService.getDebtLiabilityDetails(caseData);
    const demandNoticeDetails = caseService.getDemandNoticeDetails(caseData);
    const delayCondonationDetails =
      caseService.getDelayCondonationDetails(caseData);

    const prayerSwornStatementDetails =
      caseService.getPrayerSwornStatementDetails(caseData);
    const placeholderList = caseService.getComplainantPlaceholderList(caseData);

    const pdfRequest = {
      RequestInfo: requestInfo,
      Data: [
        {
          courtName: courtName,
          place: place,
          filingNumber: filingNumber,
          complainantList: complainants,
          accusedList: accuseds,
          prayer: prayer,
          complaint: complaint,
          dateOfFiling: dateOfFiling,
          documentList: documentList,
          witnessScheduleList: witnessScheduleList,
          placeholderList: placeholderList,
        },
      ],
    };

    console.log("Pdf Request: {}", pdfRequest);
    await fileService.validateDocuments(caseData?.documents || []);
    const pdf = await pdfService.generateComplaintPDF(pdfRequest);

    let finalPdf = await fileService.appendComplainantFilesToPDF(
      pdf,
      complainants
    );
    finalPdf = await fileService.appendRespondentFilesToPDF(finalPdf, accuseds);
    finalPdf = await fileService.appendChequeDetailsToPDF(
      finalPdf,
      chequeDetails
    );
    finalPdf = await fileService.appendDebtLiabilityFilesToPDF(
      finalPdf,
      debtLiabilityDetails
    );
    finalPdf = await fileService.appendDemandNoticeFilesToPDF(
      finalPdf,
      demandNoticeDetails
    );
    finalPdf = await fileService.appendDelayCondonationFilesToPDF(
      finalPdf,
      delayCondonationDetails
    );
    finalPdf = await fileService.appendPrayerSwornFilesToPDF(
      finalPdf,
      prayerSwornStatementDetails
    );
    finalPdf = await fileService.appendAdvocateFilesToPDF(finalPdf, advocates);

    const finalPdfBuffer = Buffer.from(finalPdf);
    console.log("Pdf Generated Successfully");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="caseDetails.pdf"'
    );
    res.send(finalPdfBuffer);
  } catch (error) {
    if (error instanceof DocumentError) {
      return res.status(400).send({ documentType: error?.documentType || "" });
    }
    next(error);
  }
};

exports.caseComplaintPdf = async (req, res, next) => {
  try {
    const requestInfo = req?.body?.RequestInfo;

    const caseData = req?.body?.cases;
    const courtName = config?.courtName;
    const place = config?.courtPlace;
    const filingNumber = caseData.filingNumber;

    if (!filingNumber) {
      console.log("Case Data", caseData);
      throw new Error("Filing Number is not present");
    }

    const complainants =
      caseService.getComplainantsDetailsForComplaint(caseData);
    const accuseds = caseService.getRespondentsDetailsForComplaint(caseData);
    const prayer = await caseService.getPrayerSwornStatementDetails(
      caseData
    )?.[0]?.prayer;
    const complaint = htmlToFormattedText(
      caseService.getPrayerSwornStatementDetails(caseData)?.[0]
        ?.memorandumOfComplaintText
    );
    const dateOfFiling = caseService.formatDate(
      caseData?.filingDate ? new Date(caseData?.filingDate) : new Date()
    );
    const documentList = caseService.getDocumentList(caseData);
    const witnessScheduleList =
      caseService.getWitnessDetailsForComplaint(caseData);
    const placeholderList = caseService.getComplainantPlaceholderList(caseData);

    const pdfRequest = {
      RequestInfo: requestInfo,
      Data: [
        {
          courtName: courtName,
          place: place,
          filingNumber: filingNumber,
          complainantList: complainants,
          accusedList: accuseds,
          prayer: prayer,
          complaint: complaint,
          dateOfFiling: dateOfFiling,
          documentList: documentList,
          witnessScheduleList: witnessScheduleList,
          placeholderList: placeholderList,
        },
      ],
    };

    console.log("Pdf Request: {}", pdfRequest);
    const pdf = await pdfService.generateComplaintPDF(pdfRequest);

    const finalPdfBuffer = Buffer.from(pdf);
    console.log("Pdf Generated Successfully");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="caseComplaintDetails.pdf"'
    );
    res.send(finalPdfBuffer);
  } catch (error) {
    next(error);
  }
};

// Function to extract the year (2025)
function extractCaseYear(input) {
  const yearMatch = input.match(/-(\d{4})$/);
  if (yearMatch) {
    return yearMatch[1]; // Return the captured year
  } else {
    return "";
  }
}

// Function to extract the case number (000053)
function extractCaseNumber(input) {
  const match = input.match(/-(\d{6})-/);
  if (match) {
    return match[1]; // Return the captured 6-digit case number
  } else {
    return "";
  }
}
