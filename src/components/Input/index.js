import React from "react";

function Input({ size = "medium", onChange, placeholder, value, maxLength }) {
  const sizeDecider = () => {
    if (size === "small") {
      return "px-2 py-1 text-sm";
    } else if (size === "medium") {
      return "px-4 py-1 text-base";
    } else if (size === "large") {
      return "px-4 py-2 text-lg";
    }
  };

  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      class={`text-text-primary ${sizeDecider()} w-full bg-input-background opacity-75 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg weight-bold`}
    />
  );
}

export default Input;
