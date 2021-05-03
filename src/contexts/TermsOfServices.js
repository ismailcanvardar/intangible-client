import React from "react";
import TOSModal from "../components/TOSModal";
import { Web3Context } from "./Web3Provider";

export const TOSContext = React.createContext();

const TermsOfServices = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { account } = React.useContext(Web3Context);

  React.useEffect(() => {
    const isApprovedValue = localStorage.getItem("approved");
    if ((isApprovedValue === "false" || isApprovedValue === null) && account !== undefined) {
        console.log(account);
        setShowModal(true);
    }
  }, [account]);

  const approve = () => {
    localStorage.setItem("approved", "true");
    setShowModal(false);
  };

  return <TOSModal showModal={showModal} setShowModal={setShowModal} approve={approve}/>;
};

export default TermsOfServices;
