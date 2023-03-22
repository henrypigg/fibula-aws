import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

function App() {
  const [downloadLink, setDownloadLink] = useState("");

  const getDownloadLink = async () => {
    try {
      const response = await fetch("https://n7cb2loyv3.execute-api.us-east-1.amazonaws.com/prod/installer");
      const data = await response.text();
      console.log(data);
      setDownloadLink(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDownloadLink();
  }, []);

  const handleDownload = () => {
    window.open(downloadLink);
  };

  return (
    <div class="page">
      <Button variant="contained" disabled={downloadLink === ""} onClick={handleDownload}>Download MacOS Installer</Button>
    </div>
  );
}

export default App;