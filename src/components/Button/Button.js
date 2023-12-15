import React from "react";

export default function Button({
  type = "button",
  text = "Submit",
  onClick = () => {},
  className = "",
  style = {},
  disabled = false,
}) {
  return (
    <button
      style={style}
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
