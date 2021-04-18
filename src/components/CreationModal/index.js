import React, { useState, useContext, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import { Web3Context } from "../../contexts/Web3Provider";
import {
  isApprovedForAll,
  setApprovalForAll,
  isWhitelisted,
  mintToken,
} from "../../helpers/nftMethods";
import { Redirect } from "react-router";
import { addToIpfs } from "../../utils/uploadData";

export default function CreationModal({
  showModal,
  setShowModal,
  assetCredential,
  disabled,
}) {
  const { account, intangibleNft } = useContext(
    Web3Context
  );
  const [isApproved, setIsApproved] = useState();
  const [isMinted, setIsMinted] = useState(false);
  const [approving, setApproving] = useState(false);
  const [minting, setMinting] = useState(false);
  const [whitelisted, setWhitelisted] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const checkApproval = async () => {
    isApprovedForAll(
      intangibleNft,
      account,
      process.env.REACT_APP_AUCTION_HOUSE
    )
      .then((res) => {
        setIsApproved(res);
      })
      .catch((err) => console.log(err));
  };

  const checkWhitelist = async () => {
    isWhitelisted(intangibleNft, account)
      .then((res) => {
        console.log(res);
        setWhitelisted(res);
      })
      .catch((err) => console.log(err));
  };

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

  const handleMint = async () => {
    setMinting(true);
    setIsUploadingImage(true);
    const assetHash = await addToIpfs(assetCredential.asset);
    const formattedData = JSON.stringify({
      title: assetCredential.title,
      description: assetCredential.description,
      asset: assetHash,
      fileType: assetCredential.fileType,
      creator: account
    });
    const ipfsHash = await addToIpfs(formattedData);
    setIsUploadingImage(false);
    await mintToken(
      intangibleNft,
      account,
      setMinting,
      setIsMinted,
      ipfsHash
    );
  };

  useEffect(() => {
    if (showModal === true) {
      checkApproval();
      checkWhitelist();
    }
  }, [showModal]);

  if (isMinted === true) {
    return (
      <Redirect
        to={{ pathname: "/profile", state: { isNewTokenMinted: true } }}
      />
    );
  }

  return (
    <>
      <Button
        disabled={disabled}
        onClick={() => setShowModal(true)}
        size="large"
        label="Create Collection"
        bgColor="bg-button-primary"
      />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-3 mx-auto min-w-2xl max-w-3xl">
              {/*content*/}
              <div className="border-0 max-w-sm rounded-lg shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none shadow-gif">
                {/*header*/}
                {/* <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div> */}
                {/*body*/}

                {whitelisted === false ? (
                  <div className="p-6 w-full object-center">
                    <p className="text-text-primary text-center text-xl font-bold">
                      You have to verify your account to create collection.
                    </p>
                    <div className="flex justify-center items-center a">
                      <svg
                        className="animate-spin mt-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-48 w-48 rounded-full"
                        viewBox="0 0 24 24"
                      ></svg>
                    </div>
                    <div className="pt-6 pb-14 md:pb-0">
                      <form className="flex gap-1">
                        <Input placeholder="Your email" size="medium" />
                        <div className="ml-3">
                          <Button
                            size="medium"
                            label={"Send"}
                            bgColor="bg-button-primary"
                            labelColor="text-text-primary"
                            shadow="shadow hover:shadow-gif"
                          />
                        </div>
                      </form>
                      <p className="text-text-primaryPale text-xs mt-2 p-1">
                        Please provide your email to validate yourself. We'll
                        send you validation form.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative px-6 flex-auto">
                      <p className="text-text-primary mt-4 text-blueGray-500 text-lg leading-relaxed">
                        Approve your wallet
                      </p>
                      <p className="text-text-primaryPale mt-1 mb-2 text-blueGray-500 text-xs leading-relaxed">
                        {isApproved === true
                          ? "You have already approved your wallet. You don't need to approve it again. You can skip this method."
                          : "You have to approve your wallet to Intangible contract."}
                      </p>
                      <Button
                        loading={approving === true ? true : false}
                        disabled={
                          approving || isApproved === true ? true : false
                        }
                        onClick={handleApproval}
                        size="medium"
                        label="Approve"
                        bgColor="bg-white"
                      />
                    </div>
                    <div className="relative px-6 flex-auto">
                      <p className="text-text-primary mt-4 text-blueGray-500 text-lg leading-relaxed">
                        Mint Token
                      </p>
                      <p className="text-text-primaryPale mt-1 mb-2 text-blueGray-500 text-xs leading-relaxed">
                        Mint your collection & we'll send it to your account.
                      </p>
                      <div className="mb-4">
                        <Button
                          disabled={minting || isApproved !== true}
                          loading={minting}
                          onClick={handleMint}
                          size="medium"
                          label="Mint"
                          bgColor="bg-white"
                        />
                        {isUploadingImage === true && (
                          <p className="text-text-primaryPale mt-2 text-xs">
                            Please wait, asset is uploading...
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {/*footer*/}
                <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
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
