import React from "react";

const Avatar = ({size = "medium"}) => {
  const sizeDecider = () => {
    if (size==="small") {
      return "w-10 h-10";
    } else if (size === "medium") {
      return "w-16 h-16";
    } else if (size === "large") {
      return "w-24 h-24";
    } else if (size === "xlarge") {
      return "w-48 h-48";
    } else if (size === "xxlarge") {
      return "w-64 h-64";
    } 
  }

  return <div className={`${sizeDecider()} rounded-full bg-primary`}></div>;
}

export default Avatar;
