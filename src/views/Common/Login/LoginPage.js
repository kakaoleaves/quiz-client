import Button from "components/Button";
import LabelInput from "components/LabelInput";
import { UserContext } from "contexts/userContext";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { login } from "services/auth";
import { usernameRegex, passwordRegex } from "utils/regex";

export default function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    try {
      const response = await login(data.username, data.password);
      if (response) {
        setUser(response);
        localStorage.setItem("user", JSON.stringify(response));
        if (response?.isAdmin) {
          navigate("/admin/user");
        } else {
          navigate("/client");
        }
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data);
    }
  };

  return (
    <div className="page">
      <h1>Login</h1>
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
          type="password"
          autoComplete="current-password"
          errors={errors?.password}
        />
        <Button type="submit" text="Login" className="submit" />
      </form>
      <p>
        Don&apos;t have an account?<Link to="/register">Register</Link>
      </p>
    </div>
  );
}
