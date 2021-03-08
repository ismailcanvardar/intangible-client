import React from "react";
import Avatar from "../Avatar";

function CreatorInfo() {
  return (
    <div
      className={`w-full md:w-72 h-96 rounded-xl bg-control shadow shadow-button1 flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer`}
    >
      <img
        className="rounded-t-xl w-full h-1/3 object-cover"
        src="https://picsum.photos/1920/1080"
      />
      <div className="fixed h-full w-full flex top-20 left-6">
        <Avatar size="large" />
      </div>
      <div className="h-full rounded-b-xl px-6 pt-12 bg-background">
        <h1 className="mt-2 text-xl font-bold text-text-primary">User Name here</h1>
        <div className="mt-2 mb-3 flex flex-row items-center">
          <h1 className="text-sm text-primary">@thisisausername</h1>
        </div>
        <h1 className="text-md w-6/8 text-text-primary">
          This is description about user
        </h1>
      </div>
    </div>
  );
}

export default CreatorInfo;
