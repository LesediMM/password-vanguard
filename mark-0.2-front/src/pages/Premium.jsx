import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

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


export default function Premium() {
  const navigate = useNavigate();
  const [referenceText, setReferenceText] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  // Check for login token on component load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // This effect re-generates the password whenever the reference text changes
  useEffect(() => {
    if (referenceText.length > 0) {
      generatePassword(referenceText);
    } else {
      setGeneratedPassword(""); // Clear password if input is empty
    }
  }, [referenceText]);

  // Set body style on mount
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.background = "#f3f4f6";
    return () => {
      document.body.style.margin = "";
      document.body.style.background = "";
    };
  }, []);

  // Leetspeak mapping
  const leetMap = { a: "4", e: "3", i: "1", o: "0", s: "5", t: "7" };

  // Function to generate the password from reference text
  const generatePassword = (text) => {
    let newPass = "";
    for (let char of text.toLowerCase()) {
      newPass += leetMap[char] || char;
    }
    if (newPass.length > 0) {
      newPass = newPass.charAt(0).toUpperCase() + newPass.slice(1);
    }
    newPass = newPass.replace(/\s/g, "");
    const currentYear = new Date().getFullYear();
    newPass += `!${currentYear}`;

    setGeneratedPassword(newPass);
    setCopyMessage("");
  };
  
  // Function to copy password to clipboard
  const copyToClipboard = () => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    setCopyMessage("Copied!");
    setTimeout(() => setCopyMessage(""), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
       {/* Header */}
      <header style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: "24px 32px", 
        borderBottom: "1px solid #e5e7eb", 
        background: "white", 
      }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#E01F1F" }}>Premium: RefGenPass</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            background: "#374151",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: '600'
          }}
        >
          Logout
        </button>
      </header>
      
       {/* Main container with 3-column layout */}
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", padding: "20px" }}>
        
        {/* Left Ad Space */}
        <AdSpace />

        <main style={{ width: "100%", maxWidth: 600 }}>
          <p style={{ color: "#4b5563", marginTop: 0, marginBottom: 24 }}>Enter a memorable phrase to generate a consistent, strong password.</p>
          
          <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            {/* Reference Text Input */}
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="reference" style={{ display: "block", marginBottom: 8, fontWeight: 500, color: '#374151' }}>Your Reference Phrase</label>
              <input
                id="reference"
                type="text"
                value={referenceText}
                onChange={(e) => setReferenceText(e.target.value)}
                placeholder="e.g., My dog's name is Buddy"
                style={{ width: "100%", boxSizing: "border-box", padding: "12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 16 }}
              />
            </div>

            {/* Generated Password Display */}
            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: '#374151' }}>Generated Password</label>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="text"
                  value={generatedPassword}
                  readOnly
                  placeholder="Your password will appear here"
                  style={{ flexGrow: 1, padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 16, background: "#f9fafb" }}
                />
                <button 
                  onClick={copyToClipboard}
                  style={{ padding: "10px 16px", background: "#374151", color: "white", border: "none", borderRadius: 8, cursor: "pointer", minWidth: '80px' }}
                >
                  {copyMessage ? copyMessage : "Copy"}
                </button>
              </div>
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
