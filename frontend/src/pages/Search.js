import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const API_URL = "http://localhost:4000/api/users/";
  const [search, setSearch] = useState([]);

  const handleFetch = async (text) => {
   if(text !== ""){
    const response = await axios.get(API_URL + "search/?query=" + text);
    setSearch(response.data);
   }else{
    setSearch([])
   }
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          handleFetch(e.target.value);
        }}
      />

      {search.map((user) => (
        <div>{user.username}</div>
      ))}
    </div>
  );
}
