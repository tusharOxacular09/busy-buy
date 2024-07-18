// src/pages/ErrorPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found 😢</h1>
      <p>Sorry, the page you are looking for does not exist. 😔</p>
      <button
        onClick={handleBackClick}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
