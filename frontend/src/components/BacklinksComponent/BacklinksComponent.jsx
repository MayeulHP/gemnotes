import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BacklinksComponent.css";

const BacklinksComponent = ({ selectedFile }) => {
  const [backlinks, setBacklinks] = useState([]);

  useEffect(() => {
    if (selectedFile) {
      // Fetch backlinks for the selected file
      axios
        .get(`/api/backlinks/${selectedFile}`)
        .then((response) => setBacklinks(response.data))
        .catch((error) => console.error("Error fetching backlinks:", error));
    }
  }, [selectedFile]);

  return (
    <div className="backlinks-container">
      <h3>Backlinks</h3>
      <ul>
        {backlinks.map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
    </div>
  );
};

export default BacklinksComponent;