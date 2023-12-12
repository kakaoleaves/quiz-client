import React from "react";
import "./LabelInput.css";

export default function LabelInput({
  label,
  id,
  register,
  required = false,
  type = "text",
  min = 0,
  max = 100,
  pattern = null,
  ...rest
}) {
  return (
    <div className="label-input">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        {...register(id, { required, min, max, pattern })}
        {...rest}
      />
    </div>
  );
}
