import React from "react";
import "./LabelInput.css";

export default function LabelInput({
  label,
  id,
  register,
  type = "text",
  options,
  errors,
  ...rest
}) {
  return (
    <div className="label-input">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...register(id, { ...options })} {...rest} />
      {errors && (
        <span role="alert" className="error">
          {errors.message}
        </span>
      )}
    </div>
  );
}
