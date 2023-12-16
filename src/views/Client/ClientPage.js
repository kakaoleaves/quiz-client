import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "contexts/userContext";
import { getQuizStats, getQuizsByUser, postAnswer } from "services/quiz";
import Modal from "react-modal";
import AnswerBox from "components/AnswerBox";
import Button from "components/Button";

export default function ClientPage() {
  const { user } = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);

  const fetchQuestions = async () => {
    const data = await getQuizsByUser(user.userId);
    const notAnswered = data.filter((question) => question.userAnswer === null);
    const answered = data.filter((question) => question.userAnswer);
    // useranswer 없는 것 먼저
    setQuestions(notAnswered.concat(answered));
  };

  const fetchStats = async () => {
    const data = await getQuizStats(user.userId);
    setCorrect(data.totalCorrectAnswers);
    setAttempt(data.totalAttempts);
  };

  useEffect(() => {
    if (user) {
      fetchQuestions();
      fetchStats();
    }
  }, [user]);

  const status = (question) => {
    const { userAnswer } = question;
    if (userAnswer) {
      if (userAnswer.isCorrect) {
        return "Correct";
      } else {
        return "Incorrect";
      }
    } else {
      return "Unanswered";
    }
  };

  const onClickRow = (question) => {
    setSelectedQuestion(question);
  };

  const onClickSubmit = async () => {
    try {
      const data = {
        userId: user.userId,
        questionId: selectedQuestion.questionId,
        choiceId: answer,
      };
      const res = await postAnswer(data);
      window.alert("Answer submitted!");
      setSelectedQuestion({
        ...selectedQuestion,
        userAnswer: res,
      });
      setAnswer(null);
      fetchStats();
      fetchQuestions();
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  return (
    <div className="page">
      <h1>Your Quiz Info </h1>
      <p>
        You attempted <strong>{attempt}</strong> questions and got{" "}
        <strong>{correct}</strong> correct.
      </p>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr
              className="clickable-row"
              key={question.questionId}
              onClick={() => onClickRow(question)}
            >
              <td>{question.content}</td>
              <td
                className={
                  status(question) === "Correct"
                    ? "correct"
                    : status(question) === "Incorrect"
                      ? "incorrect"
                      : "unanswered"
                }
              >
                {status(question)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={!!selectedQuestion}
        className="modal"
        overlayClassName="modal-overlay"
        onRequestClose={() => {
          setSelectedQuestion(null);
          setAnswer(null);
        }}
        shouldCloseOnEsc
      >
        <h2>Question {selectedQuestion?.questionId}.</h2>
        <h3>{selectedQuestion?.content}</h3>
        <div className="answer-box-wrap">
          {selectedQuestion?.choices.map((choice) => (
            <AnswerBox
              key={choice.choiceId}
              choice={choice}
              answer={answer}
              setAnswer={setAnswer}
              question={selectedQuestion}
            />
          ))}
        </div>
        {!selectedQuestion?.userAnswer && (
          <div className="end-btn-wrap">
            <Button
              className="default"
              text="Submit"
              disabled={!answer}
              onClick={onClickSubmit}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
