import Web3 from "web3";

export const convertEtherToWei = (amount) => {
  return Web3.utils.toWei(amount, "ether");
};

export const convertWeiToEth = (amount) => {
  return Web3.utils.fromWei(amount, "ether");
};
