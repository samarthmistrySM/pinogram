import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const API_URL = "http://localhost:4000/api/users/";
  const [search, setSearch] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleFetch = async (text) => {
    if (text !== "") {
      const response = await axios.get(API_URL + "search/?query=" + text);
      setSearch(response.data);
    } else {
      setSearch([]);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search users..."
        className="w-full border border-gray-300 rounded p-2 mb-4"
        onChange={(e) => {
          handleFetch(e.target.value);
        }}
      />

      <div className="grid grid-cols-3 gap-4">
        {search.map((user,index) => (
          <button
            key={index}
            className="p-4 my -4 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelectUser(user)}
          >
            <p className="text-lg font-semibold">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </button>
        ))}
      </div>

      {selectedUser && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Selected User</h2>
          <div className="border border-gray-300 rounded p-4">
            <div
              className="h-3/4 py-8 relative bg-cover bg-center flex items-center justify-around"
              style={{ backgroundImage: `url(${selectedUser.bg})` }}
            >
              <img
                className="w-32 h-32 justify-start object-cover rounded-full"
                src={selectedUser.dp}
                alt={selectedUser.dp}
              />
              <div className="text-white z-10">
                <p className="text-2xl font-semibold mix-blend-difference">
                  {selectedUser.username}
                </p>
                <p className="text-lg mix-blend-difference">{selectedUser.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
