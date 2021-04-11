import React from "react";

function GradientHeading({ heading }) {
  return (
    <h1 class="text-5xl font-black subpixel-antialiased">
      <span class="text-gradient bg-gradient-to-r from-primary via-info to-danger">
        {heading}
      </span>
    </h1>
  );
}

export default GradientHeading;
