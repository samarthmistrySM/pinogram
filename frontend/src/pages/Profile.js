import React from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import Card from "../components/Profile/Card";

export default function Profile({loggedUser, setCount}) {

  return (
    <div className="px-4">
      <ProfileHeader loggedUser={loggedUser} setCount={setCount}/>
      <div className="flex max-h-screen justify-around">
      <div className="w-1/4 m-6 bg-gray-600"></div>
      <div className="flex flex-col items-center overflow-scroll">
        {loggedUser.posts.map((post, index) => (
          <Card loggedUser={loggedUser} key={index} post={post} setCount={setCount}/>
          ))}
      </div>
      </div>
    </div>
  );
}
