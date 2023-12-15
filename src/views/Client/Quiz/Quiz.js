import React, { useMemo, useState } from "react";

export default function Quiz() {
  // eslint-disable-next-line
const [questions, setQuestions] = useState([]);
  // eslint-disable-next-line
    const [current, setCurrent] = useState(0);

  const total = useMemo(() => questions.length, [questions]);

  // eslint-disable-next-line
  const handleAnswerButtonClick = () => {
    const nextQuestion = current + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert("Quiz completed");
    }
  };

  return (
    <div className="page">
      <h1>WEB PROGRAMMING Quiz</h1>
      <h2>
        Question {1} of {total}:
      </h2>
      <h3>{questions[current]?.content}</h3>
      {}
    </div>
  );
}
