import React from "react";
import Footer from "components/Footer/Footer";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "views/Login/LoginPage";
import NotFoundPage from "views/NotFound/NotFoundPage";
import Header from "components/Header/Header";
import UserDashboard from "views/Admin/UserDashboard/UserDashboard";
import RegisterPage from "views/Register/RegisterPage";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
