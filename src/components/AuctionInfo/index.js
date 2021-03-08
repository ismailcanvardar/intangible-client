import React from "react";
import Avatar from "../../components/Avatar";

function AuctionInfo({ condition }) {
  const shadowDecider = () => {
    if (condition === "LIVE") {
      return "shadow-button2";
    } else if (condition === "NOT_MET") {
      return "shadow-button3";
    }
  }

  return (
    <div className={`w-full md:w-72 h-96 rounded-xl bg-control shadow ${shadowDecider()} flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer`}>
      <img
        className="rounded-t-xl w-full h-2/3 object-cover"
        src="https://picsum.photos/1920/1080"
      />
      <div className="px-6 py-4 bg-background">
        <h1 className="font-bold text-xl w-6/8 text-text-primary">Image title goes here</h1>
        <div className="mt-4 mb-3 flex flex-row items-center">
          <Avatar size="small"/>
          <h1 className="ml-2 text-sm text-primary">@thisisausername</h1>
        </div>
      </div>
      <div
        className={`shadow-cardInner px-6 py-3 flex justify-between ${
          condition === "LIVE"
            ? "bg-primary"
            : condition === "NOT_MET"
            ? "bg-warning"
            : condition === "SOLD"
            ? "bg-success"
            : null
        } rounded-b-xl`}
      >
        {condition === "LIVE" && (
          <>
            <div>
              <h1 className="text-text-primary font-bold">Current bid</h1>
              <p>0.05 ETH</p>
            </div>
            <div>
              <h1 className="text-text-primary font-bold">Ending in</h1>
              <p>2h 5m 12s</p>
            </div>
          </>
        )}
        {condition === "NOT_MET" && (
          <>
            <div>
              <h1 className="text-text-primary font-bold">Reserved price</h1>
              <p>0.05 ETH</p>
            </div>
          </>
        )}
        {condition === "SOLD" && (
          <>
            <div>
              <h1 className="text-text-primary font-bold">Sold for</h1>
              <p>0.05 ETH</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AuctionInfo;
