import React, { Fragment, useEffect } from "react";
import Footer from "components/Footer";
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
import Header from "components/Header";
import UserDashboard from "views/Admin/UserDashboard/UserDashboard";
import RegisterPage from "views/Common/Register/RegisterPage";
import QuizDashboard from "views/Admin/QuizDashboard/QuizDashboard";
import ClientPage from "views/Client/ClientPage";
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
          navigate("/client");
        }
      }
    }
  }, [user, location.pathname, navigate]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (
      !user &&
      (location.pathname.includes("/admin") ||
        location.pathname.includes("/client"))
    ) {
      window.alert("You need to login to access this page!");
      navigate("/");
    }
  }, []);

  return <Fragment />;
}

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <div id="root">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Header />
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
            {user && !user?.isAdmin && (
              <>
                <Route path="/client" element={<ClientPage />} />
              </>
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
