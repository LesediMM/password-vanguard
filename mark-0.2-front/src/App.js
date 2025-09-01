import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ Import ALL your pages, including the new ones
import Home from "./pages/Home";
import Premium from "./pages/Premium";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PassGen from "./pages/PassGen"; // New
import StrCheck from "./pages/StrCheck"; // New
import BreakEst from "./pages/BreakEst"; // New
import NotFound from "./pages/NotFound"; // Import NotFound

// Main App Component
function App() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    fetch("/api/ping")
      .then((res) => res.text())
      .then((data) => setStatus(data))
      .catch(() => setStatus("Connection failed"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home status={status} />} />

        {/* ✅ Real pages for the free tools */}
        <Route path="/generator" element={<PassGen />} />
        <Route path="/strength" element={<StrCheck />} />
        <Route path="/break" element={<BreakEst />} />

        {/* Auth pages */}
        <Route path="/premium" element={<Premium />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;