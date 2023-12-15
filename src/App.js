import React, { Fragment, useEffect } from "react";
import Footer from "components/Footer/Footer";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginPage from "views/Common/Login/LoginPage";
import NotFoundPage from "views/Common/NotFound/NotFoundPage";
import Header from "components/Header/Header";
import UserDashboard from "views/Admin/UserDashboard/UserDashboard";
import RegisterPage from "views/Common/Register/RegisterPage";
import QuizDashboard from "views/Admin/QuizDashboard/QuizDashboard";
import Quiz from "views/Client/Quiz/Quiz";
import ClientInfo from "views/Client/Main/ClientInfo";
import { UserContext } from "contexts/userContext";

function LoginManager() {
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const jsonUser = JSON.parse(localStorage.getItem("user"));
    if (jsonUser) {
      setUser(jsonUser);
    } else {
      setUser(null);
    }
  }, [setUser]);

  useEffect(() => {
    if (user) {
      if (location.pathname === "/") {
        if (user.isAdmin) {
          navigate("/admin/user");
        } else {
          navigate("/client/info");
        }
      }
    }
  }, [user, location.pathname, navigate]);

  return <Fragment />;
}

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <div id="root">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <BrowserRouter>
          <LoginManager />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Admin Routes */}
            {user?.isAdmin && (
              <>
                <Route path="/admin/user" element={<UserDashboard />} />
                <Route path="/admin/quiz" element={<QuizDashboard />} />
              </>
            )}
            {user?.isClient && (
              <>
                <Route path="/client/info" element={<ClientInfo />} />
                <Route path="/client/quiz" element={<Quiz />} />
              </>
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
