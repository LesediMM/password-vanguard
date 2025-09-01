import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ✅ Component for the ad spaces
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

// ✅ Component for the blog placeholder
const BlogSpace = () => (
  <div
    style={{
      marginTop: "24px",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "24px",
      background: "white",
      textAlign: "center",
    }}
  >
    <h3 style={{ margin: "0 0 8px", color: "#E01F1F", fontSize: "18px" }}>From the Blog</h3>
    <p style={{ margin: 0, color: "#6b7280" }}>
      Interested in writing about password security?
      <br />
      <a href="#" style={{ color: "#4b5563", fontWeight: "600", textDecoration: "underline" }}>Post your blog here.</a>
    </p>
  </div>
);

export default function BreakEst() {
  const [password, setPassword] = useState("");
  const [estimation, setEstimation] = useState("Enter a password to see the estimate.");

  // This effect recalculates the time whenever the password changes
  useEffect(() => {
    if (password.length === 0) {
      setEstimation("Enter a password to see the estimate.");
      return;
    }
    calculateTime(password);
  }, [password]);
  
  // This effect sets the body style on component mount
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.background = "#f3f4f6";
    return () => {
      document.body.style.margin = "";
      document.body.style.background = "";
    };
  }, []);

  // Function to calculate the estimated time to crack
  const calculateTime = (pass) => {
    const length = pass.length;
    let characterPool = 0;

    if (/[a-z]/.test(pass)) characterPool += 26;
    if (/[A-Z]/.test(pass)) characterPool += 26;
    if (/[0-9]/.test(pass)) characterPool += 10;
    if (/[^A-Za-z0-9]/.test(pass)) characterPool += 32;

    const combinations = Math.pow(characterPool, length);
    const guessesPerSecond = 10e9; // 10 billion guesses per second
    const seconds = combinations / guessesPerSecond;

    setEstimation(formatTime(seconds));
  };

  // Helper function to format seconds into a readable string
  const formatTime = (seconds) => {
    if (seconds < 1) return "Instantly";
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
    if (seconds < 31536000000) return `${Math.round(seconds / 3153600000)} centuries`;
    return "Eternity";
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      {/* Header */}
      <header style={{ 
        padding: "24px 32px", 
        borderBottom: "1px solid #e5e7eb", 
        background: "white", 
      }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#E01F1F" }}>Break-Time Estimator</h1>
      </header>
      
      {/* Main container with 3-column layout */}
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", padding: "20px" }}>
        
        {/* Left Ad Space */}
        <AdSpace />

        <main style={{ width: "100%", maxWidth: 600 }}>
          <p style={{ color: "#4b5563", marginTop: 0, marginBottom: 24 }}>See how long it would theoretically take a powerful computer to crack your password.</p>
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            {/* Password Input */}
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type a password to analyze"
              style={{ width: "100%", boxSizing: "border-box", padding: "12px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 16, marginBottom: 24 }}
            />

            {/* Estimation Display */}
            <div style={{ textAlign: "center", border: "1px solid #e5e7eb", borderRadius: 8, padding: "32px 20px", background: '#f9fafb' }}>
              <p style={{ margin: 0, color: "#6b7280", fontSize: 14, textTransform: "uppercase", letterSpacing: '1px' }}>Estimated Time to Crack</p>
              <p style={{ margin: "8px 0 0", color: "#111827", fontSize: "2.5rem", fontWeight: 700 }}>
                {estimation}
              </p>
            </div>
          </div>

          {/* Blog Placeholder */}
          <BlogSpace />

          <Link to="/" style={{ color: "#4b5563", display: "inline-block", marginTop: 24, textDecoration: 'none' }}>← Back to Home</Link>
        </main>

        {/* Right Ad Space */}
        <AdSpace />

      </div>
    </div>
  );
}
