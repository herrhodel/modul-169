import React from "react";
import modulConfig from "../../../modul.config";

export default function Slide({ name }) {
  const path = `/${modulConfig.repoName}/slides/${name}`;
  const pdfPath = `${path}.pdf`;
  return (
    <>
      <p>
        <a href={path} target="_blank">
          💻 Im Browser öffnen
        </a>{" "}
        |{" "}
        <a href={pdfPath} target="_blank">
          💾 PDF Speichern
        </a>
      </p>
      <iframe src={path} width="100%" height="400px"></iframe>
    </>
  );
}
