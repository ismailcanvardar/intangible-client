import React from "react";
import Socials from "../Socials";

function BottomInfo() {
  return (
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 justify-between h-64 md:h-48 items-center p-24">
          <h1 className="font-bold text-text-primary text-4xl">Intangible</h1>
          <Socials color="black"/>
      </div>
  )
}

export default BottomInfo;
