import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import { Desktop } from "./pages/Desktop";
import { Transactions } from "./pages/Transactions";

export const Root = () => (
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="desktop" element={<Desktop />} />
        <Route path="transactions" element={<Transactions />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
