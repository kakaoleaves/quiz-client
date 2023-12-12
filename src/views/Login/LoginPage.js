import Button from "components/Button/Button";
import LabelInput from "components/Input/LabelInput";
import React from "react";
import { useForm } from "react-hook-form";
import { login } from "services/auth";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data.username, data.password);
      if (response) {
        localStorage.setItem("user", JSON.stringify(response));
        window.location.href = "/client";
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
          required
          autoComplete="username"
        />
        <LabelInput
          label="Password"
          id="password"
          register={register}
          required
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" text="Login" className="submit" />
      </form>
      <p>
        Don&apos;t have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}
