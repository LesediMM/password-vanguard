import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ✅ New Component for the ad spaces to keep code clean
const AdSpace = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "160px", // Width of the ad column
      border: "2px dashed #d1d5db",
      borderRadius: "12px",
      background: "#f9fafb",
      color: "#9ca3af",
      textAlign: "center",
      padding: "20px",
      writingMode: "vertical-rl", // Rotates the text vertically
      textOrientation: "mixed",
      letterSpacing: "2px",
      fontSize: "14px",
      fontWeight: "600",
      textTransform: "uppercase",
    }}
  >
    Host Your Ad Here
  </div>
);

const Card = ({ title, subtitle }) => (
  <div
    className="home-card"
    style={{
      display: "block",
      textDecoration: "none",
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      padding: "16px 20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      background: "white", // Give cards a solid background
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
    }}
  >
    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: "#E01F1F" }}>
      {title}
    </div>
    <div style={{ fontSize: 14, color: "#4b5563" }}>{subtitle}</div>
  </div>
);

// ✅ New Component for the status indicator
const StatusIndicator = ({ status }) => {
  let dotColor = "#9ca3af"; // Grey for connecting
  let text = "Connecting...";

  if (status === "Connection failed") {
    dotColor = "#ef4444"; // Red
    text = "Connection Failed";
  } else if (status === "Connected to backend") {
    dotColor = "#22c55e"; // Green
    text = "Connected";
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6b7280", marginTop: "8px" }}>
      <span style={{ height: "10px", width: "10px", backgroundColor: dotColor, borderRadius: "50%", display: "inline-block" }}></span>
      <span>Status: <strong>{text}</strong></span>
    </div>
  );
};


export default function Home() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    // ✅ Dynamically set the API URL based on the environment
    const API_URL = process.env.NODE_ENV === 'production' 
      ? 'https://password-vanguard-api.onrender.com'
      : 'http://localhost:5000';

    // Ping the backend for status
    fetch(`${API_URL}/api/ping`)
      .then((res) => res.text())
      .then((txt) => setStatus(txt))
      .catch(() => setStatus("Connection failed"));
      
    // ✅ Remove default body margin to eliminate top white space
    document.body.style.margin = "0";
    // Cleanup function to restore margin when component unmounts
    return () => {
      document.body.style.margin = "";
    };
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", background: "#f3f4f6", minHeight: "100vh" }}>
      <header style={{ 
        padding: "24px 32px", 
        borderBottom: "1px solid #e5e7eb", 
        background: "white", 
        color: "#111827" 
      }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#E01F1F" }}>Password Vanguard</h1>
        <StatusIndicator status={status} />
      </header>

      {/* ✅ Main container now uses flex to create the 3-column layout */}
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", padding: "20px" }}>
        
        {/* Left Ad Space */}
        <AdSpace />

        {/* Center Content Column */}
        <main style={{ width: "100%", maxWidth: "600px", paddingTop: '20px' }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <Link to="/generator" style={{ textDecoration: "none" }}>
              <Card title="Password Generator" subtitle="Create strong, memorable passwords" />
            </Link>
            <Link to="/strength" style={{ textDecoration: "none" }}>
              <Card title="Strength Checker" subtitle="Analyze password strength" />
            </Link>
            <Link to="/break" style={{ textDecoration: "none" }}>
              <Card title="Break-Time Estimator" subtitle="Estimate time to crack" />
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Card title="Login" subtitle="Access premium features" />
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Card title="Register" subtitle="Create an account" />
            </Link>
          </div>
        </main>
        
        {/* Right Ad Space */}
        <AdSpace />

      </div>

      <footer style={{ padding: "20px", textAlign: "center", color: "#6b7280", marginTop: 40 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
          <p style={{ margin: "0 0 4px", fontWeight: "600", color: "#E01F1F", fontSize: '16px' }}>
            Services: Web App Development & Ad Hosting
          </p>
          <p style={{ margin: "0 0 12px", fontSize: '14px' }}>
            Contact for more details:
          </p>
          <p style={{ margin: 0, fontSize: "14px", display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="mailto:Lesedi@aucegypt.edu" style={{ color: "#2563eb", textDecoration: "none" }}>Lesedi@aucegypt.edu</a>
            <span>•</span>
            <span>+20 104 488 2618</span>
            <span>•</span>
            <a href="http://www.techmedsport.com" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "none" }}>www.techmedsport.com</a>
          </p>
        </div>
        <p style={{ marginTop: "24px", fontSize: "12px", color: "#9ca3af" }}>
          © {new Date().getFullYear()} Password Vanguard
        </p>
      </footer>
    </div>
  );
}

