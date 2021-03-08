import React from "react";
import useDropdownStore from "../../stores/useDropdownStore";

function Container({ children }) {
  const { closeDropdown } = useDropdownStore();

  return (
    <div
      className="min-h-screen 2xl:px-48 xl:px-40 lg:px-32 md:px-24 sm:px-16 px-8 bg-background"
      onClick={closeDropdown}
    >
      {children}
    </div>
  );
}

export default Container;
