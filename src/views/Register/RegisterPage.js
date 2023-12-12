import LabelInput from "components/Input/LabelInput";
import React from "react";
import { useForm } from "react-hook-form";
import { usernameRegex } from "utils/regex";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();

  /**
   * Handle form submission.
   */
  const onSubmit = async () => {
    try {
      const response = await register(register);
      if (response) {
      }
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelInput
          label="Username"
          id="username"
          register={register}
          required
          autoComplete="username"
          pattern={usernameRegex}
        />
        <LabelInput
          label="Password"
          id="password"
          register={register}
          required
          type="password"
          autoComplete="current-password"
        />
        <LabelInput
          label="Confirm Password"
          id="confirmPassword"
          register={register}
          required
          type="password"
        />
      </form>
    </div>
  );
}
