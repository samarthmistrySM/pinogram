import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

export default function Profile() {
  let cookie = Cookies.get("auth");
  let loggedUser;
  if (cookie) {
    loggedUser = JSON.parse(cookie);
  } else {
    if (!loggedUser) return (window.location = "/");
  }
  return (
    <>
      <div
        className="h-3/4 bg-cover bg-center flex items-center justify-center"
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
                <p className="text-black">{loggedUser.posts.length }</p>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
