import React, { useContext, useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import Container from "../../components/Container";
import BottomInfo from "../../components/BottomInfo";
import CollectionInfo from "../../components/CollectionInfo";
import AddressBox from "../../components/AddressBox";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Web3Context } from "../../contexts/Web3Provider";
import { RingLoader } from "react-spinners";

function Profile() {
  const { state } = useLocation();
  const [isNewTokenMinted, setIsNewTokenMinted] = useState();
  const { account } = useContext(Web3Context);
  const [collections, setCollections] = useState();

  useEffect(() => {
    if (state && state.isNewTokenMinted === true) {
      setIsNewTokenMinted(true);
    }
  }, [state]);

  useEffect(() => {
    if (account !== null && account !== undefined) {
      getTokens();
    }
  }, [account]);

  const getTokens = () => {
    console.log(account);
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/tokens/${account}`)
      .then((res) => setCollections(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="bg-background w-screen">
        <img
          className="pt-2 h-screen/3 w-full object-cover"
          src="https://picsum.photos/1920/1080"
        />
        <div className="absolute left-1/2">
          <div className="relative -left-1/2 -mt-24">
            <Avatar size="xxlarge" />
          </div>
        </div>
      </div>
      <Container>
        <div className="pt-48 flex flex-col items-center m-h-screen">
          <h1 className="text-text-primary text-3xl font-bold uppercase text-center">
            This is a name of user
          </h1>
          <h1 className="text-text-primary my-2">@thisisusername</h1>
          {
            account &&  <AddressBox account={account}/>
          }
          {collections === undefined || collections === null ? (
            <div className="py-16 flex justify-center">
              <RingLoader color={"tomato"} size={50} />
            </div>
          ) : (
            <div className="flex justify-center py-16">
              <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                {
                  collections.map(collection => {
                    return (
                      <CollectionInfo key={collection._id} data={collection}/>
                    )
                  })
                }
              </div>
            </div>
          )}
        </div>
        <BottomInfo />
      </Container>
    </>
  );
}

export default Profile;
