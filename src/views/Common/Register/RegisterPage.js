import Button from "components/Button/Button";
import LabelInput from "components/Input/LabelInput";
import React from "react";
import { useForm } from "react-hook-form";
import { usernameRegex, passwordRegex } from "utils/regex";
import { signup } from "services/auth";

export default function RegisterPage() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const password = watch("password");

  const onSubmit = async () => {
    try {
      const response = await signup({
        username: watch("username"),
        password: watch("password"),
      });
      if (response) {
        window.alert("Account created successfully!");
      }
    } catch (error) {
      alert(error.response?.data);
    }
  };

  console.log(errors);

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
    </div>
  );
}
