import React, { useContext, useEffect, useState } from "react";
import { createQuiz, deleteQuiz, editQuiz, getQuiz } from "services/quiz";
import Modal from "react-modal";
import Button from "components/Button";
import LabelInput from "components/LabelInput";
import { useForm } from "react-hook-form";
import { UserContext } from "contexts/userContext";

Modal.setAppElement("#root");

export default function QuizDashboard() {
  const [quizList, setQuizList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const getQuizList = async () => {
    const data = await getQuiz();
    setQuizList(data);
  };

  useEffect(() => {
    getQuizList();
  }, []);

  const { user } = useContext(UserContext);

  const {
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onClickRow = (quiz) => {
    setModalOpen(true);
    setSelectedQuiz(quiz);
    setValue("question", quiz.content);
    setValue("choice1", quiz.choices[0].content);
    setValue("choice2", quiz.choices[1].content);
    setValue("choice3", quiz.choices[2].content);
    setValue("choice4", quiz.choices[3].content);
    setValue(
      "answer",
      (quiz.choices.findIndex((choice) => choice.isCorrect) + 1).toString(),
    );
  };

  const onSubmit = async () => {
    try {
      if (selectedQuiz) {
        // edit
        const res = await editQuiz(selectedQuiz.questionId, {
          content: watch("question"),
          choices: [
            {
              choiceId: selectedQuiz.choices[0].choiceId,
              content: watch("choice1"),
              isCorrect: watch("answer") === "1",
            },
            {
              choiceId: selectedQuiz.choices[1].choiceId,
              content: watch("choice2"),
              isCorrect: watch("answer") === "2",
            },
            {
              choiceId: selectedQuiz.choices[2].choiceId,
              content: watch("choice3"),
              isCorrect: watch("answer") === "3",
            },
            {
              choiceId: selectedQuiz.choices[3].choiceId,
              content: watch("choice4"),
              isCorrect: watch("answer") === "4",
            },
          ],
        });
        if (res) {
          window.alert("Quiz updated successfully.");
          setQuizList((prev) =>
            prev.map((quiz) =>
              quiz.questionId === selectedQuiz.questionId ? res : quiz,
            ),
          );
          setModalOpen(false);
        }
      } else {
        // create
        const res = await createQuiz({
          content: watch("question"),
          choices: [
            {
              content: watch("choice1"),
              isCorrect: watch("answer") === "1",
            },
            {
              content: watch("choice2"),
              isCorrect: watch("answer") === "2",
            },
            {
              content: watch("choice3"),
              isCorrect: watch("answer") === "3",
            },
            {
              content: watch("choice4"),
              isCorrect: watch("answer") === "4",
            },
          ],
          createdBy: user.userId,
        });
        if (res) {
          window.alert("Quiz created successfully.");
          setQuizList((prev) => [...prev, res]);
          setModalOpen(false);
        }
      }
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  const onDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this quiz?",
    );
    if (!confirm) return;

    try {
      const res = await deleteQuiz(selectedQuiz.questionId);
      if (res) {
        window.alert("Quiz deleted successfully.");
        setQuizList((prev) =>
          prev.filter((quiz) => quiz.questionId !== selectedQuiz.questionId),
        );
        setModalOpen(false);
      }
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  const createDisabled =
    !watch("question") ||
    !watch("choice1") ||
    !watch("choice2") ||
    !watch("choice3") ||
    !watch("choice4") ||
    !watch("answer");

  const modifyDisabled =
    !watch("question") ||
    !watch("choice1") ||
    !watch("choice2") ||
    !watch("choice3") ||
    !watch("choice4") ||
    !watch("answer") ||
    (watch("question") === selectedQuiz?.content &&
      watch("choice1") === selectedQuiz?.choices[0].content &&
      watch("choice2") === selectedQuiz?.choices[1].content &&
      watch("choice3") === selectedQuiz?.choices[2].content &&
      watch("choice4") === selectedQuiz?.choices[3].content &&
      watch("answer") ===
        (
          selectedQuiz?.choices.findIndex((choice) => choice.isCorrect) + 1
        ).toString());

  useEffect(() => {
    if (!modalOpen) {
      setSelectedQuiz(null);
      reset();
    }
  }, [modalOpen]);

  return (
    <div className="page">
      <h1>Quiz Dashboard</h1>
      <p>Press the row to edit the quiz.</p>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Quiz Created</th>
            <th>Quiz Creator</th>
          </tr>
        </thead>
        <tbody>
          {quizList.length === 0 && (
            <tr>
              <td colSpan={3}>No quiz found.</td>
            </tr>
          )}
          {quizList.map((quiz) => (
            <tr
              className="clickable-row"
              key={quiz?.questionId}
              onClick={() => {
                onClickRow(quiz);
              }}
            >
              <td>{quiz?.content}</td>
              <td>{quiz?.dateCreated}</td>
              <td>{quiz?.creator?.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="end-btn-wrap">
        <Button
          className="default"
          text="Create Quiz"
          onClick={() => setModalOpen(true)}
        />
      </div>
      <Modal
        isOpen={modalOpen}
        className="modal"
        overlayClassName="modal-overlay"
        onRequestClose={() => setModalOpen(false)}
        shouldCloseOnEsc
      >
        <h2>Quiz Detail</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInput
            label="Question"
            id="question"
            register={register}
            options={{
              required: "Enter the quiz content",
              maxLength: { value: 100, message: "Max length is 100" },
            }}
            aria-invalid={errors.question ? "true" : "false"}
            maxLength={100}
          />
          <div className="label-input">
            <div>Choices</div>
            <div className="choice">
              <input
                type="radio"
                className="choice-radio"
                name="answer"
                value="1"
                {...register("answer", {
                  required: "Choose the answer",
                })}
              />
              <input
                className="choice-input"
                type="text"
                name="choice1"
                {...register("choice1", {
                  required: "Enter the choice content",
                  maxLength: { value: 100, message: "Max length is 100" },
                })}
                maxLength={100}
              />
            </div>
            <div className="choice">
              <input
                type="radio"
                className="choice-radio"
                name="answer"
                value="2"
                {...register("answer", {
                  required: "Choose the answer",
                })}
              />
              <input
                className="choice-input"
                type="text"
                name="choice2"
                {...register("choice2", {
                  required: "Enter the choice content",
                  maxLength: { value: 100, message: "Max length is 100" },
                })}
                maxLength={100}
              />
            </div>
            <div className="choice">
              <input
                type="radio"
                className="choice-radio"
                name="answer"
                value="3"
                {...register("answer", {
                  required: "Choose the answer",
                })}
              />
              <input
                className="choice-input"
                type="text"
                name="choice3"
                {...register("choice3", {
                  required: "Enter the choice content",
                  maxLength: { value: 100, message: "Max length is 100" },
                })}
                maxLength={100}
              />
            </div>
            <div className="choice">
              <input
                type="radio"
                className="choice-radio"
                name="answer"
                value="4"
                {...register("answer", {
                  required: "Choose the answer",
                })}
              />
              <input
                className="choice-input"
                type="text"
                name="choice4"
                {...register("choice4", {
                  required: "Enter the choice content",
                  maxLength: { value: 100, message: "Max length is 100" },
                })}
                maxLength={100}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="submit"
              text="Save"
              className="submit"
              disabled={selectedQuiz ? modifyDisabled : createDisabled}
            />
            {selectedQuiz && (
              <Button
                style={{ marginLeft: "15px" }}
                type="button"
                text="Delete"
                className="delete"
                onClick={onDelete}
              />
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
}
