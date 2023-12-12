import React, { useState } from "react";

export default function QuizDashboard() {
  const [quizList, setQuizList] = useState([]);

  const getQuizList = async () => {
    const response = await fetch("http://localhost:3001/quiz");
    const data = await response.json();
    setQuizList(data);
  };

  return (
    <div>
      <table></table>
    </div>
  );
}
