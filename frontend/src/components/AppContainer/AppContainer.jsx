import React, { useState } from "react";
import FileTreeComponent from "../FileTreeComponent/FileTreeComponent";
import EditorComponent from "../EditorComponent/EditorComponent";
import BacklinksComponent from "../BacklinksComponent/BacklinksComponent";
import "./AppContainer.css";

const AppContainer = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="app-container">
      <div className="sidebar">
        <FileTreeComponent onFileSelect={setSelectedFile} />
      </div>
      <div className="main-content">
        <EditorComponent selectedFile={selectedFile} />
        <BacklinksComponent selectedFile={selectedFile} />
      </div>
    </div>
  );
};

export default AppContainer;