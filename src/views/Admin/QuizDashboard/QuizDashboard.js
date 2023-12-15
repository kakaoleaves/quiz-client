import React, { useEffect, useState } from "react";
import { getQuiz } from "services/quiz";
import Modal from "react-modal";

export default function QuizDashboard() {
  const [quizList, setQuizList] = useState([]);

  const getQuizList = async () => {
    const data = await getQuiz();
    setQuizList(data);
  };

  console.log(quizList);

  useEffect(() => {
    getQuizList();
  }, []);

  return (
    <div className="page">
      <h1>Quiz Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Quiz Created</th>
            <th>Quiz Creator</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {quizList.map((quiz) => (
            <tr
              key={quiz?.questionId}
              onClick={() => {
                window.location.href = `/admin/quiz/${quiz?.questionId}`;
              }}
            >
              <td>{quiz?.content}</td>
              <td>{quiz?.dateCreated}</td>
              <td>{quiz?.creator?.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={true}>
        <h2>Quiz Detail</h2>
        <form>
          <label htmlFor="question">Question</label>
          <textarea id="question" />
          <label htmlFor="answer">Answer</label>
          <textarea id="answer" />
          <label htmlFor="option1">Option 1</label>
          <textarea id="option1" />
          <label htmlFor="option2">Option 2</label>
          <textarea id="option2" />
          <label htmlFor="option3">Option 3</label>
          <textarea id="option3" />
          <label htmlFor="option4">Option 4</label>
          <textarea id="option4" />
        </form>
      </Modal>
    </div>
  );
}
