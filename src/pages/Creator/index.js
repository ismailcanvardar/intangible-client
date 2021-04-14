import React, { useContext, useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import Container from "../../components/Container";
import BottomInfo from "../../components/BottomInfo";
import CollectionInfo from "../../components/CollectionInfo";
import EditProfileModal from "../../components/EditProfileModal";
import AddressBox from "../../components/AddressBox";
import { Redirect, useLocation } from "react-router-dom";
import axios from "axios";
import { Web3Context } from "../../contexts/Web3Provider";
import { RingLoader } from "react-spinners";
import Button from "../../components/Button";
import { useParams } from "react-router-dom";

function Creator() {
  const { state } = useLocation();
  const [isNewTokenMinted, setIsNewTokenMinted] = useState();
  const { account } = useContext(Web3Context);
  const [collections, setCollections] = useState();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState();
  const [isUserDataLoading, setUserDataLoading] = useState(true);

  const { address } = useParams();

  useEffect(() => {
    if (address) {
      axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}/users/${address}`)
        .then((res) => {
          console.log(res.data);
          setUserData(res.data);
          setUserDataLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [address]);

  useEffect(() => {
    if (state && state.isNewTokenMinted === true) {
      setIsNewTokenMinted(true);
    }
  }, [state]);

  useEffect(() => {
    if (address !== null && address !== undefined) {
      getTokens();
    }
  }, [address]);

  const getTokens = () => {
    console.log(address);
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/tokens/${address}`)
      .then((res) => setCollections(res.data))
      .catch((err) => console.log(err));
  };

  const handleProfilePhoto = () => {
    if (isUserDataLoading === true) {
      return <RingLoader/>
    } else {
      if (userData === null || userData.profilePhoto === null || userData.profilePhoto === "") {
        return (
          <Avatar size="xxlarge" />
        )
      } else {
        return (
          <img
            className="w-64 h-64 rounded-full"
            src={`${process.env.REACT_APP_IPFS_API}/${userData.profilePhoto}`}
          />
        );
      }
    }
  }

  const handleCoverPhoto = () => {
    if (isUserDataLoading === true) {
      return <RingLoader/>
    } else {
      if (userData === null || userData.coverPhoto === null || userData.coverPhoto === "") {
        return (
          <img
            className="pt-2 h-screen/3 w-full object-cover"
            src="https://picsum.photos/1920/1080"
          />
        )
      } else {
        return (
          <img
            className="pt-2 h-screen/3 w-full object-cover"
            src={`${process.env.REACT_APP_IPFS_API}/${userData.coverPhoto}`}
          />
        );
      }
    }
  }

  if (address === account) {
    return <Redirect to="/profile" />;
  }

  return (
    <>
      <div className="bg-background w-screen">
        {handleCoverPhoto()}
        <div className="absolute left-1/2">
          <div className="relative -left-1/2 -mt-24">
            {handleProfilePhoto()}
          </div>
        </div>
      </div>
      <Container>
        <div className="pt-48 flex flex-col items-center m-h-screen">
          <h1 className="text-text-primary text-3xl font-bold uppercase text-center">
            {userData && userData.name}
          </h1>
          <h1 className="text-text-primary my-2">
            {userData && "@" + userData.username}
          </h1>
          {address && <AddressBox account={address} />}
          {/* <div className="mt-2">
            <Button
              label="Edit Profile"
              labelColor="text-text-primary"
              bgColor="bg-primary"
              onClick={() => setShowModal(true)}
            />
          </div> */}
          {collections === undefined || collections === null ? (
            <div className="py-16 flex justify-center">
              <RingLoader color={"tomato"} size={50} />
            </div>
          ) : (
            <div className="flex justify-center py-16">
              <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {collections.map((collection) => {
                  return (
                    <CollectionInfo key={collection._id} data={collection} />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <BottomInfo />
        {/* <EditProfileModal showModal={showModal} setShowModal={setShowModal} /> */}
      </Container>
    </>
  );
}

export default Creator;
