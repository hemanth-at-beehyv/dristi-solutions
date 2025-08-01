import { Modal, Loader } from "@egovernments/digit-ui-react-components";
import { CloseSvg } from "@egovernments/digit-ui-components";
import { FileUploadIcon } from "../../../dristi/src/icons/svgIndex";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { hearingService } from "../hooks/services";

const Heading = (props) => {
  return <h1 className="heading-m">{props.label}</h1>;
};

const ForwardArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
    />
  </svg>
);

const CloseBtn = (props) => {
  return (
    <div onClick={props?.onClick} style={{ height: "100%", display: "flex", alignItems: "center", paddingRight: "20px", cursor: "pointer" }}>
      <CloseSvg />
    </div>
  );
};

const BackBtn = ({ text }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>{text}</div>
      <div style={{ width: "24px", height: "24px", marginLeft: "4px" }}>
        <ForwardArrowIcon />
      </div>
    </div>
  );
};

const WitnessModal = ({ handleClose, hearingId, setSignedDocumentUploadID, handleProceed, isProceeding }) => {
  const { t } = useTranslation();
  const [isUploaded, setUploaded] = useState(false);
  const UploadSignatureModal = window?.Digit?.ComponentRegistryService?.getComponent("UploadSignatureModal");
  const CustomButton = window?.Digit?.ComponentRegistryService?.getComponent("CustomButton");
  const tenantId = window?.Digit.ULBService.getCurrentTenantId();
  const [formData, setFormData] = useState({}); // storing the file upload data
  const [openUploadSignatureModal, setOpenUploadSignatureModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { uploadDocuments } = Digit.Hooks.orders.useDocumentUpload();
  const name = "Signature";
  const uploadModalConfig = useMemo(() => {
    return {
      key: "uploadSignature",
      populators: {
        inputs: [
          {
            name: name,
            type: "DragDropComponent",
            uploadGuidelines: "Ensure the image is not blurry and under 5MB.",
            maxFileSize: 5,
            maxFileErrorMessage: "CS_FILE_LIMIT_5_MB",
            fileTypes: ["PDF", "JPG", "JPEG", "PNG"],
            isMultipleUpload: false,
          },
        ],
        validation: {},
      },
    };
  }, [name]);

  const onSelect = (key, value) => {
    if (value === null) {
      setFormData({});
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };

  const onSubmit = async () => {
    if (formData?.uploadSignature?.Signature?.length > 0) {
      try {
        const uploadedFileId = await uploadDocuments(formData?.uploadSignature?.Signature, tenantId);
        setSignedDocumentUploadID(uploadedFileId?.[0]?.fileStoreId);
        setUploaded(true);
        setOpenUploadSignatureModal(false);
      } catch (error) {
        console.error("error", error);
        setFormData({});
      }
    }
  };

  const reqBody = {
    hearing: { tenantId },
    criteria: {
      tenantID: tenantId,
      hearingId: hearingId,
    },
  };

  // for Dowloading the Witness Deposition
  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const res = await hearingService.generateWitnessDepostionDownload(reqBody, {
        applicationNumber: "",
        cnrNumber: "",
        responseType: "blob", // Ensure the response is handled as a Blob
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "witness_deposition_pdf.pdf"); // Set the default filename
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Optionally, you can revoke the object URL after a short delay
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
    setIsDownloading(false);
  };

  return !openUploadSignatureModal ? (
    <Modal
      headerBarMain={<Heading label={t("Upload Witness Deposition")} />}
      headerBarEnd={<CloseBtn onClick={handleClose} />}
      actionSaveLabel={<BackBtn text={t("PROCEED")} />}
      isDisabled={!isUploaded}
      actionSaveOnSubmit={() => handleProceed()} // pass the handler of next modal
      className={"add-signature-modal"}
    >
      {isDownloading || isProceeding ? (
        <Loader />
      ) : (
        <div className="add-signature-main-div" style={{ padding: "10px", marginTop: "10px" }}>
          {!isUploaded ? (
            <div className="not-signed">
              <div className="sign-button-wrap">
                <CustomButton
                  icon={<FileUploadIcon />}
                  label={t("Upload the Signatured Document")}
                  onButtonClick={() => {
                    // setOpenUploadSignatureModal(true);
                    // setIsSigned(true);
                    setOpenUploadSignatureModal(true);
                  }}
                  className={"upload-signature"}
                  labelClassName={"upload-signature-label"}
                ></CustomButton>
              </div>
              <div className="donwload-submission" style={{ display: "flex", alignItems: "center" }}>
                <h2>{t("Download the Witness Deposition")}</h2>
                <button
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginLeft: "10px", color: "#007E7E", cursor: "pointer", textDecoration: "underline", background: "none" }}
                  onClick={handleDownload}
                >
                  {t("CLICK_HERE")}
                </button>
              </div>
            </div>
          ) : (
            <div className="signed" style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontWeight: 400, fontSize: "20px" }}>{t("Witness Deposition")}</div>
              <div
                style={{
                  fontSize: "16px",
                  marginLeft: "10px",
                  borderRadius: "999px",
                  padding: "6px",
                  backgroundColor: "#E4F2E4",
                  color: "#00703C",
                }}
              >
                {t("SIGNED")}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  ) : (
    <UploadSignatureModal
      t={t}
      key={name}
      name={name}
      setOpenUploadSignatureModal={setOpenUploadSignatureModal}
      onSelect={onSelect}
      config={uploadModalConfig}
      formData={formData}
      onSubmit={onSubmit}
    />
  );
};

export default WitnessModal;
