import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/Input";
import {
  DatePicker,
  KeyboardDatePicker,
  TimePicker,
  DateTimePicker,
} from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import moment from "moment";
import Button from "../Button";
import {
  createColdieAuction,
  createScheduledAuction,
} from "../../helpers/auctionMethods";
import { Web3Context } from "../../contexts/Web3Provider";
import Web3 from "web3";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#ee7e53",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "#ee7e53",
        color: "red",
      },
    },
    MuiInputBase: {
      input: {
        color: "red",
        fontFamily: "Orbitron",
      },
    },
  },
});

const Tabs = ({ color, tokenId }) => {
  const [openTab, setOpenTab] = useState(1);
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [startingTime, setStartingTime] = useState(new Date());
  const [endingTime, setEndingTime] = useState(new Date());
  const [coldieCreating, setColdieCreating] = useState(false);
  const [scheduledCreating, setScheduledCreating] = useState(false);
  const [auctionCreated, setAuctionCreated] = useState(false);
  const [reservePrice, setReservePrice] = useState("");
  const [minimumBid, setMinimumBid] = useState("");
  const [scheduledInputOkay, setScheduledInputOkay] = useState(false);
  const { intangibleAuctionHouse, account } = useContext(Web3Context);

  const handleColdieAuction = (e) => {
    const lengthOfAuction = 5000;
    createColdieAuction(
      intangibleAuctionHouse,
      process.env.REACT_APP_INTANGIBLE_NFT,
      tokenId,
      reservePrice,
      lengthOfAuction,
      account,
      moment().format("YYYY-MM-DD HH:mm:ss"),
      moment().add(1, "day").format("YYYY-MM-DD HH:mm:ss"),
      setColdieCreating,
      setAuctionCreated
    );
  };

  const handleScheduledAuction = (e) => {
    const lengthOfAuction = 500;
    const starting =
      moment(startingDate).format("YYYY-MM-DD") +
      " " +
      moment(startingTime).format("HH:mm:ss");
    const ending =
      moment(endingDate).format("YYYY-MM-DD") +
      " " +
      moment(endingTime).format("HH:mm:ss");
    window.web3.eth
      .getBlockNumber()
      .then((blockNumber) => {
        createScheduledAuction(
          intangibleAuctionHouse,
          process.env.REACT_APP_INTANGIBLE_NFT,
          tokenId,
          minimumBid,
          lengthOfAuction,
          parseInt(blockNumber) + 3,
          account,
          moment(starting).format("YYYY-MM-DD HH:mm:ss"),
          moment(ending).format("YYYY-MM-DD HH:mm:ss"),
          setScheduledCreating,
          setAuctionCreated
        );
      })
      .catch((err) => console.log("Cannot fetch current block number."));
  };

  useEffect(() => {
    if (auctionCreated === true) {
      window.location.reload();
    }
  }, [auctionCreated]);

  useEffect(() => {
    const starting =
      moment(startingDate).format("YYYY-MM-DD") +
      " " +
      moment(startingTime).format("HH:mm:ss");
    const ending =
      moment(endingDate).format("YYYY-MM-DD") +
      " " +
      moment(endingTime).format("HH:mm:ss");
    const difference = moment(ending).diff(moment(starting), "minutes");
    if (difference < 10080 && difference > 15 && minimumBid.length > 0) {
      setScheduledInputOkay(true);
    } else {
      setScheduledInputOkay(false);
    }
  }, [startingTime, startingDate, endingTime, endingDate, minimumBid]);

  return (
    <>
      <div className="flex flex-wrap w-96">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Reserve
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Scheduled
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-background w-full">
            <div className="pt-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  {/* <p className="text-text-primary">
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C users
                    after installed base benefits.
                    <br />
                    <br /> Dramatically visualize customer directed convergence
                    without revolutionary ROI.
                  </p> */}
                  <div className="flex flex-row gap-4 items-center">
                    <Input
                      value={reservePrice}
                      onChange={(e) => setReservePrice(e.target.value)}
                      placeholder="Reserve price"
                    />
                    <p className="text-text-primary">AVAX</p>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Button
                      onClick={handleColdieAuction}
                      label="Start"
                      bgColor="bg-primary"
                      labelColor="text-text-secondary"
                      disabled={
                        reservePrice.length === 0 || coldieCreating === true
                      }
                      loading={coldieCreating === true}
                    />
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  {/* <p className="text-text-primary">
                    Completely synergize resource taxing relationships via
                    premier niche markets. Professionally cultivate one-to-one
                    customer service with robust ideas.
                    <br />
                    <br />
                    Dynamically innovate resource-leveling customer service for
                    state of the art customer service.
                  </p> */}
                  <ThemeProvider theme={materialTheme}>
                    <div className="flex px-2">
                      <div>
                        <p className="text-text-primaryPale text-sm">
                          Starting Date:
                        </p>
                        <DatePicker
                          color="secondary"
                          value={startingDate}
                          onChange={setStartingDate}
                          format="DD-MM-YYYY"
                        />
                        <p className="text-text-primaryPale text-sm">
                          Starting Time:
                        </p>
                        <TimePicker
                          clearable
                          ampm={false}
                          value={startingTime}
                          onChange={setStartingTime}
                        />
                      </div>
                      <div>
                        <p className="text-text-primaryPale text-sm">
                          Ending Date:
                        </p>
                        <DatePicker
                          color="secondary"
                          value={endingDate}
                          onChange={setEndingDate}
                          format="DD-MM-YYYY"
                        />
                        <p className="text-text-primaryPale text-sm">
                          Ending Time:
                        </p>
                        <TimePicker
                          clearable
                          ampm={false}
                          value={endingTime}
                          onChange={setEndingTime}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4 pt-4 pl-2 pr-4">
                      <Input
                        value={minimumBid}
                        onChange={(e) => setMinimumBid(e.target.value)}
                        placeholder="Minimum bid"
                      />
                      <p className="text-text-primary">AVAX</p>
                    </div>
                    <div className="px-2 pt-2 text-sm">
                      <p className="text-text-primaryPale">Auction duration must be bigger than 15 minutes and lower than 7 days.</p>
                    </div>
                  </ThemeProvider>
                  <div className="mt-6 flex justify-center">
                    <Button
                      onClick={handleScheduledAuction}
                      label="Start"
                      bgColor="bg-primary"
                      labelColor="text-text-secondary"
                      loading={scheduledCreating}
                      disabled={scheduledCreating || !scheduledInputOkay}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
