import React, { useState } from "react";

function App() {
  const [response, setResponse] = useState("");

  const handleClick = async () => {
    try {
      const result = await fetch(
        "https://n7cb2loyv3.execute-api.us-east-1.amazonaws.com/prod/installer",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await result.json();
      setResponse(JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Hit API Gateway Endpoint</button>
      <p>{response}</p>
    </div>
  );
}

export default App;