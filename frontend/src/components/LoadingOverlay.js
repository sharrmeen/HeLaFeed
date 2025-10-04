import React from "react";

function LoadingOverlay({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 bg-background-dark bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-background-light rounded-xl p-6 flex flex-col items-center shadow-lg">
        <div
          className="loader mb-4"
          style={{
            border: "4px solid #E8FDFB",
            borderTop: "4px solid #12C781",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <p className="text-text-dark font-medium">{message}</p>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default LoadingOverlay;
