import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FileTreeComponent.css";

const FileTreeComponent = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch the list of files from the backend
    axios
      .get("/api/files")
      .then((response) => setFiles(response.data))
      .catch((error) => console.error("Error fetching files:", error));
  }, []);

  const renderTree = (files) => {
    return files.map((file) => (
      <div key={file.name} className="file-item">
        {file.type === "directory" ? (
          <details>
            <summary>{file.name}</summary>
            <div className="nested">{renderTree(file.children)}</div>
          </details>
        ) : (
          <div onClick={() => onFileSelect(file.name)}>{file.name}</div>
        )}
      </div>
    ));
  };

  return <div className="file-tree">{renderTree(files)}</div>;
};

export default FileTreeComponent;