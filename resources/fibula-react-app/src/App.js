import React, { useState, useEffect } from "react";

function App() {
  const [downloadLink, setDownloadLink] = useState("");

  const getDownloadLink = async () => {
    try {
      const response = await fetch(
        "https://n7cb2loyv3.execute-api.us-east-1.amazonaws.com/prod/installer",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response;
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
    <div>
      <button onClick={handleDownload}>Hit API Gateway Endpoint</button>
    </div>
  );
}

export default App;