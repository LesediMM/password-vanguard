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

export default function StrCheck() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({
    score: 0,
    text: "Too short",
    color: "#ef4444", // Red
    checks: {
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      symbol: false,
    },
  });

  // This effect runs whenever the password input changes
  useEffect(() => {
    analyzeStrength(password);
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

  // Function to analyze the password strength
  const analyzeStrength = (pass) => {
    let score = 0;
    const checks = {
      length: pass.length >= 8,
      lowercase: /[a-z]/.test(pass),
      uppercase: /[A-Z]/.test(pass),
      number: /[0-9]/.test(pass),
      symbol: /[^A-Za-z0-9]/.test(pass),
    };

    if (checks.length) score++;
    if (checks.lowercase) score++;
    if (checks.uppercase) score++;
    if (checks.number) score++;
    if (checks.symbol) score++;

    let text = "Too short";
    let color = "#ef4444";
    if (pass.length >= 8) {
      switch (score) {
        case 1: case 2: text = "Weak"; color = "#f97316"; break;
        case 3: text = "Medium"; color = "#facc15"; break;
        case 4: case 5: text = "Strong"; color = "#22c55e"; break;
        default: text = "Weak"; color = "#f97316";
      }
    }
    
    setStrength({ score, text, color, checks });
  };

  // Helper to render check items
  const CheckItem = ({ label, isMet }) => (
    <li style={{ color: isMet ? "#22c55e" : "#6b7280", transition: "color 0.3s" }}>
      {isMet ? "✓" : "✗"} {label}
    </li>
  );

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      {/* Header */}
      <header style={{ 
        padding: "24px 32px", 
        borderBottom: "1px solid #e5e7eb", 
        background: "white", 
      }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#E01F1F" }}>Strength Checker</h1>
      </header>
      
      {/* Main container with 3-column layout */}
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", padding: "20px" }}>
        
        {/* Left Ad Space */}
        <AdSpace />

        <main style={{ width: "100%", maxWidth: 600 }}>
          <p style={{ color: "#4b5563", marginTop: 0, marginBottom: 24 }}>Enter a password to see how strong it is in real-time.</p>
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            {/* Password Input */}
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password here"
              style={{ width: "100%", boxSizing: "border-box", padding: "12px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 16, marginBottom: 16 }}
            />

            {/* Strength Indicator Bar */}
            <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", background: "#e5e7eb", marginBottom: 8 }}>
              <div style={{ width: `${(strength.score / 5) * 100}%`, background: strength.color, transition: "width 0.3s, background-color 0.3s" }} />
            </div>
            <p style={{ textAlign: "right", margin: "0 0 24px", fontWeight: 700, color: strength.color }}>
              {strength.text}
            </p>

            {/* Checklist */}
            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: '20px' }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                <CheckItem label="At least 8 characters long" isMet={strength.checks.length} />
                <CheckItem label="Contains lowercase letters (a-z)" isMet={strength.checks.lowercase} />
                <CheckItem label="Contains uppercase letters (A-Z)" isMet={strength.checks.uppercase} />
                <CheckItem label="Contains numbers (0-9)" isMet={strength.checks.number} />
                <CheckItem label="Contains symbols (!@#$)" isMet={strength.checks.symbol} />
              </ul>
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
