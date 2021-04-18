import React from "react";

function Button({
  onClick,
  bgColor,
  disabled,
  label,
  labelColor = "text-text-secondary",
  size = "medium",
  shadow = "",
  loading = false,
}) {
  const sizeDecider = () => {
    if (size === "small") {
      return "px-2 py-1 text-sm";
    } else if (size === "medium") {
      return "px-4 py-1 text-base";
    } else if (size === "large") {
      return "px-8 py-2 text-lg";
    }
  };

  return (
    <button
      onClick={disabled === true ? null : onClick}
      class={`${disabled ? "bg-gray-200" : bgColor} ${labelColor} ${shadow} ${
        disabled
          ? "focus:outline-none"
          : "transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-white"
      } ${sizeDecider()} rounded-lg font-bold`}
    >
      <div className="flex flex-row justify-center items-center">
        {loading === true && (
          <svg
            className="animate-spin h-5 w-5 mr-3 bg-background rounded-xl border-b-8 border-text-backgroundPale"
            viewBox="0 0 24 24"
          ></svg>
        )}
        <p className={labelColor}>{label}</p>
      </div>
    </button>
  );
}

export default Button;
