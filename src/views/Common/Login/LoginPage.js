import Button from "components/Button/Button";
import LabelInput from "components/Input/LabelInput";
import React from "react";
import { useForm } from "react-hook-form";
import { login } from "services/auth";
import { usernameRegex, passwordRegex } from "utils/regex";

export default function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data.username, data.password);
      if (response) {
        console.log(response);
        if (response?.isAdmin) {
          window.location.href = "/admin/user";
        } else {
          window.location.href = "/client/info";
        }
      }
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="page">
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
        Don&apos;t have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
