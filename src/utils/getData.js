import axios from "axios";

export const getIpfsData = async (ipfsHash) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_IPFS_API}/${ipfsHash}`
  );
  return data;
};
