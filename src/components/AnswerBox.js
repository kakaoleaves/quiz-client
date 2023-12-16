import React from "react";

export default function AnswerBox({ choice, answer, setAnswer, question }) {
  return (
    <button
      className={
        "answer-box" +
        (answer === choice?.choiceId ? " selected" : "") +
        ((question?.userAnswer?.choiceId !== choice?.choiceId &&
          choice?.isCorrect) ||
        (question?.userAnswer?.choiceId === choice?.choiceId &&
          choice?.isCorrect)
          ? " answer-correct"
          : "") +
        (question?.userAnswer?.choiceId === choice?.choiceId &&
        !question?.userAnswer?.isCorrect
          ? " answer-incorrect"
          : "")
      }
      onClick={() => setAnswer(choice?.choiceId)}
      disabled={question?.userAnswer}
    >
      <label htmlFor={choice?.choiceId}>
        {choice?.content}
        <input
          type="radio"
          name="answer"
          id={choice?.choiceId}
          className="checkmark"
          value={choice?.choiceId}
          onChange={(e) => setAnswer(e.target.value)}
          checked={
            question?.userAnswer?.choiceId === choice?.choiceId ||
            answer === choice?.choiceId
          }
          disabled={question?.userAnswer}
        />
      </label>
    </button>
  );
}
