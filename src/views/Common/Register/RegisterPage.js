import Button from "components/Button";
import LabelInput from "components/LabelInput";
import React from "react";
import { useForm } from "react-hook-form";
import { usernameRegex, passwordRegex } from "utils/regex";
import { signup } from "services/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async () => {
    try {
      const response = await signup({
        username: watch("username"),
        password: watch("password"),
      });
      if (response) {
        window.alert("Account created successfully!");
        navigate("/");
      }
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  console.log(errors);

  return (
    <div className="page">
      <h1>Register</h1>
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
        <LabelInput
          label="Confirm Password"
          id="confirmPassword"
          register={register}
          options={{
            required: true,
            validate: (value) =>
              value === password || "The passwords do not match",
          }}
          type="password"
          autoComplete="current-password"
          errors={errors?.confirmPassword}
        />
        <Button type="submit" text="Register" className="submit" />
      </form>
      <p>
        Already have an account?<Link to="/">Login</Link>
      </p>
    </div>
  );
}
