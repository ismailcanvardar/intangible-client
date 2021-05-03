import React, { useContext, useEffect, useState } from "react";
import Input from "../Input";
import { bid } from "../../helpers/auctionMethods";
import { Web3Context } from "../../contexts/Web3Provider";
import Button from "../Button";

export default function BidModal({ showModal, setShowModal, tokenId }) {
  const [bidAmount, setBidAmount] = useState("");
  const [lastPrice, setLastPrice] = useState(0);
  const [bidOnQueue, setBidOnQueue] = useState(false);

  const { account, intangibleAuctionHouse, avaxPrice } = useContext(Web3Context);

  useEffect(() => {
    let bid = parseFloat(bidAmount);
    if (bid > 0) {
      let amount = (parseFloat(bidAmount) * 2) / 100;
      setLastPrice(amount + bid);
    } else {
        setLastPrice(0)
    }
  }, [bidAmount]);

  const handleBid = () => {
      bid(
        intangibleAuctionHouse,
        process.env.REACT_APP_INTANGIBLE_NFT,
        lastPrice.toString(),
        bidAmount.toString(),
        account,
        tokenId,
        setBidOnQueue
      );
  }

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 bg-background shadow-gif max-w-sm rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto max-w-48">
                  <div className="flex justify-center items-center gap-4">
                    <Input
                      onChange={(e) => {
                        if (e.target.value.length < 7) {
                          setBidAmount(e.target.value);
                        }
                      }}
                      value={bidAmount}
                      placeholder="Bid amount"
                    />
                    <p className="text-text-primary">AVAX</p>
                  </div>
                  <p className="text-text-primaryPale px-2 mt-4">
                    You will be pay {lastPrice === 0 ? 0 : lastPrice.toFixed(4)}{" "} - ${(lastPrice * avaxPrice).toString().slice(0, 6)}
                    with marketplace fee.
                  </p>
                  <div className="flex justify-center mt-4">
                    <Button
                      disabled={lastPrice === 0 || bidOnQueue === true}
                      label="Bid"
                      loading={bidOnQueue === true}
                      bgColor="bg-button-primary"
                      onClick={handleBid}
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
