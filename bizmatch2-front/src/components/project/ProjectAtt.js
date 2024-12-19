import React from "react";
import downloadFile from "../http/api/projectApi";
import downloadStyle from "./ProjectDownload.module.css";
export default function ProjectAtt({ data }) {
  console.log(data);
  const handleDownload = (fileId, fileName) => {
    downloadFile(fileId, fileName);
  };

  return (
    <div
      className={downloadStyle.downloadLink}
      onClick={() => handleDownload(data.pjAttId, data.pjAttUrl)}
    >
      {data.pjAttUrl}
    </div>
  );
}
