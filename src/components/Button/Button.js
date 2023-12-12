import React from "react";

export default function Button({
  type = "button",
  text = "Submit",
  onClick = () => {},
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
