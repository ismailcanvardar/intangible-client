import React from "react";
import { createPopper } from "@popperjs/core";

const Tooltip = ({ color }) => {
  const [tooltipShow, setTooltipShow] = React.useState(false);
  const btnRef = React.createRef();
  const tooltipRef = React.createRef();
  const openLeftTooltip = () => {
    createPopper(btnRef.current, tooltipRef.current, {
      placement: "bottom"
    });
    setTooltipShow(true);
  };
  const closeLeftTooltip = () => {
    setTooltipShow(false);
  };
  return (
    <>
      <div>
        <div className="w-full text-center">
          <button
            className={
              "bg-button-primary text-white font-bold px-4 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            }
            type="button"
            onMouseEnter={openLeftTooltip}
            onMouseLeave={closeLeftTooltip}
            ref={btnRef}
          >
            Cancel Auction
          </button>
          <div
            className={
              (tooltipShow ? "" : "hidden ") +
              "bg-button-primary border-0 mt-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
            }
            ref={tooltipRef}
          >
            <div>
              <div
                className={
                  "bg-button-primary 600 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg"
                }
              >
                Message
              </div>
              <div className="text-white p-3">
                You cannot cancel an auction with bid.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TooltipRender() {
  return (
    <>
      <Tooltip color="red" />
    </>
  );
}