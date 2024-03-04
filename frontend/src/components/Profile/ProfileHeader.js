import React, { useState } from "react";
import { FaPlusCircle, FaHeart } from "react-icons/fa";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "./Modal";
import Upload from "../../pages/Upload";

export default function ProfileHeader({ user, loggedUser, setCount }) {
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const API_URL = "http://localhost:4000/api/";

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        API_URL +
          "users/follow/?fromUser=" +
          loggedUser._id +
          "&toUser=" +
          user._id
      );
      if (response) {
        setCount((count) => count + 1);
        toast.success(response.data, {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data, {
          position: "bottom-center",
        });
      } else {
        toast.error("Network Error", {
          position: "bottom-center",
        });
      }
    }
  };

  return (
    <div
      className="h-[50vh] w-full bg-cover bg-center flex items-center justify-center rounded-md"
      style={{ backgroundImage: `url(${user.bg})` }}
    >
      <div className="flex h-full w-full justify-start items-end text-white mt-48 ml-12">
        <img
          className="w-44 h-44 border-8 object-cover rounded-full"
          src={user.dp}
          alt="Profile"
        />
        <div className="mb-6 mx-4">
          <h1 className="text-3xl text-gray-600  font-bold">{user.username}</h1>
          <p className="text-gray-600">{user.fullname} </p>
        </div>
      </div>
      <div className="flex h-full w-full mt-36 justify-end items-end">
        {!(user.username === loggedUser.username) && (
          <button
            className="flex justify-center items-center mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleFollow}
          >
            <FaHeart className="mr-2" />
            Follow
          </button>
        )}
        {loggedUser._id === user._id && (
          <>
            {" "}
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex justify-center items-center mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <FaPlusCircle className="mr-2" />
              New Post
            </button>
            <button
              onClick={handleToggleModal}
              className="flex justify-center items-center mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Settings
            </button>
          </>
        )}
      </div>

      {showModal && (
        <Modal
          loggedUser={loggedUser}
          setCount={setCount}
          handleCloseModal={handleCloseModal}
        />
      )}

      {showUploadModal && (
        <Upload
          setCount={setCount}
          setShowUploadModal={setShowUploadModal}
          loggedUser={loggedUser}
        />
      )}
    </div>
  );
}
