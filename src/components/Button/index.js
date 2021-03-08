import React from "react";

function Button({onClick, bgColor, label, labelColor, size = "medium", shadow = ""}) {
  const sizeDecider = () => {
    if (size === "small") {
      return "px-2 py-1 text-sm";
    } else if (size === "medium") {
      return "px-4 py-1 text-base";
    } else if (size === "large") {
      return "px-8 py-2 text-lg"; 
    }
  }

  return (
    <button onClick={onClick} class={`${bgColor} ${labelColor} ${shadow} transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ${sizeDecider()} rounded-lg font-bold`}>
      {label}
    </button>
  );
}

export default Button;
