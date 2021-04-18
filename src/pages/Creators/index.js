import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Input from "../../components/Input";
import CreatorInfo from "../../components/CreatorInfo";
import BottomInfo from "../../components/BottomInfo";
import axios from "axios";
import { RingLoader } from "react-spinners";

function Creators() {
  const [searchParameter, setSearchParameter] = useState("");
  const [typing, setTyping] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    setTyping(true);
    setSearchResults();
    const typingTimeout = setTimeout(() => {
      setTyping(false);
    }, 1500);

    return () => clearTimeout(typingTimeout);
  }, [searchParameter]);

  useEffect(() => {
    if (searchParameter.length > 0 && typing === false) {
      getSearchResults();
    }
  }, [typing]);

  const getSearchResults = async () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/users/find/${searchParameter}`
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setSearchResults(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <div className="flex justify-center pt-12">
        <Input
          value={searchParameter}
          onChange={(e) => setSearchParameter(e.target.value)}
          size="large"
          placeholder="Type address, username or name..."
        />
      </div>
      <div className="h-0 my-4 border border-solid border-t-0 border-primary opacity-25" />
      <div className="h-screen">
        {searchParameter.length === 0 && (
          <div>
            <p className="text-2xl text-text-primaryPale">
              Discover creators or collectors by typing address, name or
              username.
            </p>
          </div>
        )}
        {loading === true && (
          <div className="flex justify-center items-center">
            <RingLoader color="tomato" size={40} />
          </div>
        )}
        {searchResults === false && (
          <p className="text-2xl text-text-primaryPale">Results not found.</p>
        )}
        {(searchResults !== null || searchResults !== undefined) &&
          searchResults &&
          searchResults.length > 0 && (
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {searchResults.map((result) => {
                return <CreatorInfo creatorData={result} />;
              })}
            </div>
          )}
      </div>
      <BottomInfo />
    </Container>
  );
}

export default Creators;
