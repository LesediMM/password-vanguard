import React from "react";

export default function Placeholder({ title, note }) {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <h1 style={{ marginTop: 0 }}>{title}</h1>
      <p style={{ color: "#6b7280" }}>{note || "Coming soon."}</p>
      <a href="/" style={{ color: "#2563eb" }}>← Back to Home</a>
    </div>
  );
}
