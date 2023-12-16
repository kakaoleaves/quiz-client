import { UserContext } from "contexts/userContext";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const onClickLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header>
      <div className="header-content">
        <div className="flex">
          <h3>WEB QUIZ</h3>
          {user && user?.isAdmin && (
            <nav>
              <Link to="/admin/user">User</Link>
              <Link to="/admin/quiz">Quiz</Link>
            </nav>
          )}
        </div>
        <div className="flex">
          <div className="header-user-info">
            Hello, {user?.username ?? "Guest"}!
          </div>
          {user && (
            <button className="logout-btn" onClick={onClickLogout}>
              <img
                className="logout"
                src="https://cdn-icons-png.flaticon.com/128/3889/3889524.png"
                alt="logout"
              />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
