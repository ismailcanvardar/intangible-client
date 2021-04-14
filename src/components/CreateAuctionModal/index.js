import React, { useContext, useEffect, useState } from "react";
import Tabs from "./Tabs";
import { isApprovedForAll, setApprovalForAll } from "../../helpers/nftMethods";
import { Web3Context } from "../../contexts/Web3Provider";
import { RingLoader } from "react-spinners";
import Button from "../Button";

export default function Modal({ showModal, setShowModal, tokenId }) {
  const { intangibleNft, account } = useContext(Web3Context);
  const [isApproved, setIsApproved] = useState(null);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    if (showModal === true) {
      isApprovedForAll(
        intangibleNft,
        account,
        process.env.REACT_APP_AUCTION_HOUSE
      )
        .then((data) => {
          setIsApproved(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }, [showModal]);

  const handleApproval = async () => {
    setApproving(true);
    await setApprovalForAll(
      intangibleNft,
      process.env.REACT_APP_AUCTION_HOUSE,
      account,
      setApproving,
      setIsApproved
    );
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 bg-background shadow-gif rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  {isApproved !== null ? (
                    isApproved === true ? (
                      <Tabs tokenId={tokenId} color="red" />
                    ) : (
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-text-primaryPale mt-1 mb-2 text-blueGray-500 text-xs leading-relaxed">
                          You have to approve your wallet to Intangible
                          contract."
                        </p>
                        <Button
                          loading={approving === true ? true : false}
                          disabled={approving === true ? true : false}
                          onClick={handleApproval}
                          size="medium"
                          label="Approve"
                          bgColor="bg-white"
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex justify-center items-center">
                      <RingLoader color="tomato"/>
                    </div>
                  )}
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
