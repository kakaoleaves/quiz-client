import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { deleteUser, editUser, getUsers } from "services/user";
import LabelInput from "components/Input/LabelInput";
import { usernameRegex, passwordRegex } from "utils/regex";
import Button from "components/Button/Button";

Modal.setAppElement("#root");

export default function UserDashboard() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUserList = async () => {
    const response = await getUsers();
    setUserList(response);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onClickRow = (user) => {
    setSelectedUser(user);
    setValue("username", user.username);
    setValue("password", user.password);
  };

  const onSubmit = async () => {
    try {
      const response = await editUser(selectedUser.userId, {
        username: watch("username"),
        password: watch("password"),
      });
      if (response) {
        window.alert("Account updated successfully.");
      }
      setUserList((prev) =>
        prev.map((user) => {
          if (user.userId === selectedUser.userId) {
            return {
              ...user,
              username: watch("username"),
              password: watch("password"),
            };
          }
          return user;
        }),
      );
      setSelectedUser(null);
    } catch (error) {
      alert(error.response?.data);
    }
  };

  const onDelete = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this account?",
      );
      if (!confirm) return;

      const response = await deleteUser(selectedUser.userId);
      if (response) {
        window.alert("Account deleted successfully.");
      }
      setUserList((prev) =>
        prev.filter((user) => user.userId !== selectedUser.userId),
      );
      setSelectedUser(null);
    } catch (error) {
      console.error(error);
      alert(error.response?.data);
    }
  };

  return (
    <div className="page">
      <h1>User Dashboard</h1>
      <p>Press the row to edit the user.</p>
      <table className="dashboard">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.userId} onClick={() => onClickRow(user)}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.isAdmin ? "Admin" : "User"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={selectedUser != null}
        className="modal"
        overlayClassName="modal-overlay"
        onRequestClose={() => setSelectedUser(null)}
        shouldCloseOnEsc
      >
        <h2>User Detail</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInput
            label="Username"
            id="username"
            register={register}
            options={{
              required: "Enter your username",
              pattern: { ...usernameRegex },
            }}
            aria-invalid={errors.username ? "true" : "false"}
            autoComplete="username"
            errors={errors?.username}
          />
          <LabelInput
            label="Password"
            id="password"
            register={register}
            options={{
              required: true,
              pattern: { ...passwordRegex },
            }}
            autoComplete="current-password"
            errors={errors?.password}
          />
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
              disabled={
                selectedUser?.username === watch("username") &&
                selectedUser?.password === watch("password")
              }
            />
            <Button
              style={{ marginLeft: "15px" }}
              type="button"
              text="Delete"
              className="delete"
              onClick={onDelete}
              disabled={selectedUser?.isAdmin}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
