import { UserContext } from "contexts/userContext";
import React, { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header>
      <div className="header-content">
        <h3>WEB PROG. QUIZ</h3>
      </div>
      {user && user?.isAdmin ? (
        <nav>
          <a href="/admin/user">User</a>
          <a href="/admin/quiz">Quiz</a>
        </nav>
      ) : (
        <nav>
          <a href="/client/info">Info</a>
          <a href="/client/quiz">Quiz</a>
        </nav>
      )}
    </header>
  );
}
