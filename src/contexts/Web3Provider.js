import React, { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import { default as IntangibleMarketAuctionV2 } from "../contracts/IntangibleMarketAuctionV2.json";
import { default as IntangibleAuctionHouse } from "../contracts/IntangibleAuctionHouse.json";
import { default as IntangibleNFT } from "../contracts/IntangibleNFT.json";
import { default as MarketplaceSettings } from "../contracts/MarketplaceSettings.json";
import detectEthereumProvider from "@metamask/detect-provider";
import { BiWindowOpen } from "react-icons/bi";
import axios from "axios";

export const Web3Context = createContext();

function Web3Provider({ children }) {
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const [intangibleAuctionHouse, setIntangibleAuctionHouse] = useState();
  const [intangibleNft, setIntangibleNft] = useState();
  const [marketplaceSettings, setMarketplaceSettings] = useState();
  const [balance, setBalance] = useState();
  const [avaxPrice, setAvaxPrice] = useState();

  useEffect(() => {
    connect();
    getAvaxPrice();
  }, []);

  const getAvaxPrice = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd"
      )
      .then((res) => {
        console.log(res.data["avalanche-2"]["usd"]);
        setAvaxPrice(res.data["avalanche-2"]["usd"])
      })
      .catch((err) => console.log(err));
  };

  const connect = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      // startApp(provider); // initialize your app
      console.log(provider);
      window.web3 = new Web3(provider);
      await loadBlockchainData();
    } else {
      console.log("Please install MetaMask!");
    }
  };

  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
      // Do any other work!
      getBalance(accounts[0]);
      window.location.reload();
    }
  }

  const disconnect = async () => {
    setAccount();
    window.location.reload();
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      window.ethereum.on("chainChanged", (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });

      window.ethereum.on("disconnect", () => console.log("Disconnected"));
    }
  }, []);

  function connectWallet() {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => window.location.reload())
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      });
  }

  async function getBalance(accountAddress) {
    if (accountAddress) {
      window.web3.eth.getBalance(accountAddress, (err, balance) => {
        if (err) console.log(err);

        setBalance(Web3.utils.fromWei(balance, "ether"));
      });
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    if (typeof web3 !== undefined) {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      setAccount(accounts[0]);
      getBalance(accounts[0]);
      const intangibleAuctionHouseContract = new web3.eth.Contract(
        IntangibleAuctionHouse.abi,
        process.env.REACT_APP_AUCTION_HOUSE
      );
      setIntangibleAuctionHouse(intangibleAuctionHouseContract);
      const intangibleNftContract = new web3.eth.Contract(
        IntangibleNFT.abi,
        process.env.REACT_APP_INTANGIBLE_NFT
      );
      setIntangibleNft(intangibleNftContract);
      const marketplaceSettingsContract = new web3.eth.Contract(
        MarketplaceSettings.abi,
        process.env.REACT_APP_MARKETPLACE_SETTINGS
      );
      setMarketplaceSettings(marketplaceSettingsContract);
      const name = await intangibleNftContract.methods
        .name()
        .call({ from: accounts[0] });
      console.log(name);
    }
  }

  return (
    <Web3Context.Provider
      value={{
        intangibleAuctionHouse,
        intangibleNft,
        marketplaceSettings,
        account,
        chainId,
        connectWallet,
        connect,
        balance,
        disconnect,
        avaxPrice
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export default Web3Provider;
