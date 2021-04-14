import React, { useState, useEffect, useRef, useContext } from "react";
import Input from "../Input";
import { ImUpload } from "react-icons/im";
import axios from "axios";
import { Web3Context } from "../../contexts/Web3Provider";
import { addToIpfs } from "../../utils/uploadData";

const supportedTypes = ["gif", "png", "jpg", "jpeg"];

export default function Modal({ showModal, setShowModal }) {
  const ppInput = useRef();
  const cpInput = useRef();
  const [ppFile, setPPFile] = useState();
  const [ppBuffer, setPPBuffer] = useState();
  const [ppFileType, setPPFileType] = useState();
  const [cpFile, setCPFile] = useState();
  const [cpBuffer, setCPBuffer] = useState();
  const [cpFileType, setCCFileType] = useState();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const { account } = useContext(Web3Context);

  const selectFile = (event, ppOrCP) => {
    const file = event.target.files[0];
    const type = file.type.split("/")[1];
    if (supportedTypes.indexOf(type) !== -1) {
      const reader1 = new FileReader();
      const reader2 = new FileReader();
      reader1.readAsDataURL(file);
      reader2.readAsArrayBuffer(file);
      reader1.onloadend = () => {
        // console.log(reader1.result);
        if (ppOrCP === "pp") {
          setPPFile(reader1.result);
          setPPFileType(type);
        } else {
          setCPFile(reader1.result);
          setCCFileType(type);
        }
      };
      reader2.onloadend = () => {
        // console.log(reader2.result);
        // setBuffer(reader2.result);
        if (ppOrCP === "pp") {
          setPPBuffer(reader2.result);
        } else {
          setCPBuffer(reader2.result);
        }
      };
    } else {
      console.log("Unsupported type.");
    }
  };

  useEffect(() => {
    if (showModal === false) {
      setUsername("");
      setName("");
      setPPFile();
      setCPFile();
    }
  }, [showModal]);

  const handleUpdateProfile = async () => {
    let ppHash;
    let cpHash;
    let queue;
    if (ppBuffer !== undefined) {
      ppHash = await addToIpfs(ppBuffer);
    }
    if (cpBuffer !== undefined) {
      cpHash = await addToIpfs(cpBuffer);
    }
    if (ppBuffer !== undefined) {
      queue = {
        profilePhoto: ppHash
      }
    }
    if (cpBuffer !== undefined) {
      queue = {
        ...queue,
        coverPhoto: cpHash
      }
    }
    if (name.length > 0) {
      queue = {
        ...queue,
        name
      }
    }
    if (username.length > 0) {
      queue = {
        ...queue,
        username
      }
    }
    queue = {
      ...queue,
      address: account
    }
    // console.log(queue);
    if (username.length > 0 || name.length > 0 || ppBuffer !== undefined || cpBuffer !== undefined) {
      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/users/update/${account}`, queue)
        .then((res) => {
          window.location.reload();
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 bg-background shadow-gif rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center flex-col relative p-6 flex-auto">
                  <div className="my-2">
                    <p className="text-text-primaryPale text-center mb-2">
                      Profile Photo
                    </p>

                    <button
                      onClick={() => ppInput.current.click()}
                      type="file"
                      className={`${
                        !ppFile && "border border-dashed"
                      } border-gray-500 focus:outline-none focus:border rounded h-32 w-32 flex flex-col gap-4 justify-center items-center`}
                    >
                      {ppFile == null || ppFile == undefined ? (
                        <ImUpload className="text-gray-700" size={36} />
                      ) : (
                        <img className="rounded-xl h-36 w-auto" src={ppFile} />
                      )}
                    </button>
                  </div>
                  <div className="my-2">
                    <p className="text-text-primaryPale text-center mb-2">
                      Cover Photo
                    </p>
                    <button
                      onClick={() => cpInput.current.click()}
                      type="file"
                      className={`${
                        !cpFile && "border border-dashed"
                      } border-gray-500 focus:outline-none focus:border rounded h-32 w-32 flex flex-col gap-4 justify-center items-center`}
                    >
                      {cpFile === null || cpFile == undefined ? (
                        <ImUpload className="text-gray-700" size={36} />
                      ) : (
                        <img className="rounded-xl h-36 w-auto" src={cpFile} />
                      )}
                    </button>
                  </div>
                  <div className="my-2">
                    <Input
                      value={name}
                      onChange={(e) => {
                        if (name.length < 8) {
                          setName(e.target.value);
                        }
                      }}
                      placeholder="Name here..."
                    />
                  </div>
                  <div className="my-2">
                    <Input
                      value={username}
                      onChange={(e) => {
                        if (username.length < 8) {
                          setUsername(e.target.value);
                        }
                      }}
                      placeholder="Username here..."
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-text-primary background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    // disabled={(cpFile === undefined || cpFile === null || ppFile === undefined || ppFile === null || username.length === 0 || name.length === 0) ? true : false}
                    onClick={handleUpdateProfile}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          <input
            ref={ppInput}
            onChange={(e) => selectFile(e, "pp")}
            type="file"
            style={{ display: "none" }}
          />
          <input
            ref={cpInput}
            onChange={(e) => selectFile(e, "cp")}
            type="file"
            style={{ display: "none" }}
          />
        </>
      ) : null}
    </>
  );
}
