import React, { useState } from "react";
import { useUploadFileMutation } from "../../backend/features/importsFichier/importsAPI";
import ListeImports from "../../components/etablissement/ListeMesImports";
import ListeMesImports from "../../components/etablissement/ListeMesImports";

export default function ImporterFichier() {
  const [file, setFile] = useState(null);

  const [uploadFile, { isLoading: uploading }] = useUploadFileMutation();

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("fichier", file);
    await uploadFile(formData).unwrap();
  };

  return (
    <div>
      <h1>Importer Fichier</h1>
      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Chargement..." : "Upload"}
      </button>

      <ListeMesImports />
    </div>
  );
}
