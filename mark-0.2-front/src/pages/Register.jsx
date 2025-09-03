import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Added for potential future use

  // This effect sets the body style on component mount
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.background = "#f3f4f6";
    return () => {
      document.body.style.margin = "";
      document.body.style.background = "";
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    // ✅ Dynamically set the API URL based on the environment
    const API_URL = process.env.NODE_ENV === 'production' 
      ? 'https://password-vanguard-api.onrender.com'
      : 'http://localhost:5000';

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message || "Registration complete ✅");
    } catch (err) {
      setMessage("Error connecting to server ❌");
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      {/* Header */}
      <header style={{ 
        padding: "24px 32px", 
        borderBottom: "1px solid #e5e7eb", 
        background: "white", 
      }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#E01F1F" }}>Register</h1>
      </header>

      <main style={{ padding: 24, maxWidth: 400, margin: "40px auto" }}>
        <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <p style={{ marginTop: 0, color: '#4b5563' }}>Create your account to get started.</p>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }}
            />
            <button 
              type="submit" 
              style={{ 
                padding: "12px", 
                background: "#E01F1F", 
                color: "white", 
                border: "none", 
                borderRadius: 8, 
                cursor: "pointer", 
                fontSize: 16, 
                fontWeight: '600' 
              }}
            >
              Create Account
            </button>
          </form>
          {message && <p style={{ marginTop: 16, textAlign: 'center', color: message.includes('complete') ? '#22c55e' : '#ef4444' }}>{message}</p>}
        </div>
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link to="/login" style={{ color: "#4b5563", textDecoration: 'none' }}>
            Already have an account? <strong>Login here</strong>
          </Link>
          <br/>
          <Link to="/" style={{ color: "#4b5563", display: "inline-block", marginTop: 16, textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

