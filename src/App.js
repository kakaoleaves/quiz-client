import React from "react";
import Footer from "components/Footer/Footer";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "views/Common/Login/LoginPage";
import NotFoundPage from "views/Common/NotFound/NotFoundPage";
import Header from "components/Header/Header";
import UserDashboard from "views/Admin/UserDashboard/UserDashboard";
import RegisterPage from "views/Common/Register/RegisterPage";
import QuizDashboard from "views/Admin/QuizDashboard/QuizDashboard";
import Quiz from "views/Client/Quiz/Quiz";
import ClientInfo from "views/Client/Main/ClientInfo";

function App() {
  return (
    <div id="root">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/user" element={<UserDashboard />} />
          <Route path="/admin/quiz" element={<QuizDashboard />} />
          <Route path="/client/info" element={<ClientInfo />} />
          <Route path="/client/quiz" element={<Quiz />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
