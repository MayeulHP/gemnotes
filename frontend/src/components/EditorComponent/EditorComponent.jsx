import React, { useState, useEffect } from "react";
import axios from "axios";
import { Controlled as CodeMirror } from "react-codemirror2";
import ReactMarkdown from "react-markdown";
import "./EditorComponent.css";

require("codemirror/mode/markdown/markdown");
require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");

const EditorComponent = ({ selectedFile }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedFile) {
      // Fetch the content of the selected file
      axios
        .get(`/api/files/${selectedFile}`)
        .then((response) => setContent(response.data.content))
        .catch((error) => console.error("Error fetching file content:", error));
    }
  }, [selectedFile]);

  const handleSave = () => {
    if (selectedFile) {
      // Save the updated content
      axios
        .put(`/api/files/${selectedFile}`, { content })
        .then(() => alert("File saved successfully!"))
        .catch((error) => console.error("Error saving file:", error));
    }
  };

  return (
    <div className="editor-container">
      <div className="editor">
        <CodeMirror
          value={content}
          options={{
            mode: "markdown",
            theme: "material",
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => setContent(value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>
      <div className="preview">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default EditorComponent;