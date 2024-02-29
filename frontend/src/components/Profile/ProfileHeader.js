import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

import Modal from "./Modal";
import Upload from "../../pages/Upload";

export default function ProfileHeader({ loggedUser, setCount }) {
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="h-5/6 w-full bg-cover bg-center flex items-center justify-center rounded-md"
      style={{ backgroundImage: `url(${loggedUser.bg})` }}
    >
      <div className="flex w-screen flex-col items-center text-white">
        <img
          className="w-32 h-32 mt-20 object-cover rounded-full"
          src={loggedUser.dp}
          alt="Profile"
        />
        <div className="z-9 mb-10 w-1/2 bg-white p-8 rounded-lg shadow-lg mt-8">
          <h1 className="text-3xl text-gray-600 text-center font-bold mb-2">
            {loggedUser.username}
          </h1>
          <p className="text-gray-600 text-center">{loggedUser.fullname}</p>
          <div className="flex justify-between items-center mt-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-black">Posts</h2>
              <p className="text-black">{loggedUser.posts.length}</p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex justify-center items-center ml- px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <FaPlusCircle />
            </button>
            <button
              onClick={handleToggleModal}
              className="bg-blue-500 text-white py-2 px-4 rounded-full"
            >
              Setting
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          loggedUser={loggedUser}
          setCount={setCount}
          handleCloseModal={handleCloseModal}
          handleSubmitForm={handleSubmitForm}
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
