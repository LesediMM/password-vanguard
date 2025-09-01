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

// ✅ New Component for the blog placeholder
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

export default function PassGen() {
  // State for password generation options
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copyMessage, setCopyMessage] = useState("");

  // Character sets for password generation
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  // Function to generate the password
  const generatePassword = () => {
    let charSet = lowerChars + upperChars;
    if (includeNumbers) {
      charSet += numberChars;
    }
    if (includeSymbols) {
      charSet += symbolChars;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      newPassword += charSet[randomIndex];
    }
    setPassword(newPassword);
    setCopyMessage(""); // Reset copy message on new generation
  };

  // Function to copy password to clipboard
  const copyToClipboard = () => {
    if (!password) return; // Don't copy if there's no password
    navigator.clipboard.writeText(password);
    setCopyMessage("Copied!");
    setTimeout(() => setCopyMessage(""), 2000); // Message disappears after 2 seconds
  };

  // Generate a password on initial component load and set body style
  useEffect(() => {
    generatePassword();
    document.body.style.margin = "0";
    document.body.style.background = "#f3f4f6"; // Set body background
    return () => {
      document.body.style.margin = "";
      document.body.style.background = "";
    };
  }, []); // Empty array ensures this runs only once on mount

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      {/* Header */}
      <header style={{ 
        padding: "24px 32px", 
        borderBottom: "1px solid #e5e7eb", 
        background: "white", 
      }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#E01F1F" }}>Password Generator</h1>
      </header>
      
      {/* Main container with 3-column layout */}
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", padding: "20px" }}>
        
        {/* Left Ad Space */}
        <AdSpace />

        <main style={{ width: "100%", maxWidth: 600 }}>
          <p style={{ color: "#4b5563", marginTop: 0, marginBottom: 24 }}>Create strong, secure passwords tailored to your needs.</p>
          
          {/* Password Display and Copy Button */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Your new password will appear here"
              style={{ flexGrow: 1, padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 16, background: "#f9fafb" }}
            />
            <button 
              onClick={copyToClipboard}
              style={{ padding: "10px 16px", background: "#374151", color: "white", border: "none", borderRadius: 8, cursor: "pointer", minWidth: '80px' }}
            >
              {copyMessage ? copyMessage : "Copy"}
            </button>
          </div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, background: 'white' }}>
            {/* Length Slider */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <label htmlFor="length" style={{ fontWeight: 500, color: '#374151' }}>Password Length</label>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#E01F1F', minWidth: 40, textAlign: "center" }}>{length}</span>
              <input
                id="length"
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                style={{ flexGrow: 1 }}
              />
            </div>

            {/* Checkboxes - Updated to vertical layout */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, color: '#374151' }}>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                  style={{ width: 16, height: 16 }}
                />
                Include Numbers (e.g. 123456)
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, color: '#374151' }}>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                  style={{ width: 16, height: 16 }}
                />
                Include Symbols (e.g. !@#$%)
              </label>
            </div>
            
            {/* Generate Button */}
            <button 
              onClick={generatePassword}
              style={{ padding: "12px", background: "#E01F1F", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 16, marginTop: 10, fontWeight: '600' }}
            >
              Generate New Password
            </button>
          </div>

          {/* ✅ Blog Placeholder */}
          <BlogSpace />

          <Link to="/" style={{ color: "#4b5563", display: "inline-block", marginTop: 24, textDecoration: 'none' }}>← Back to Home</Link>
        </main>

        {/* Right Ad Space */}
        <AdSpace />

      </div>
    </div>
  );
}
