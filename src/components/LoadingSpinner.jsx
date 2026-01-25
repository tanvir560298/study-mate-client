export default function LoadingSpinner() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <p style={{ fontSize: "18px", marginBottom: "10px" }}>Loading...</p>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #ccc",
          borderTop: "4px solid #333",
          borderRadius: "50%",
          margin: "0 auto",
          animation: "spin 1s linear infinite",
        }}
      />
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
