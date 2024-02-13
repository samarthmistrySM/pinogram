import React from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import Card from "../components/Profile/Card";

export default function Profile({loggedUser,setCount}) {

  return (
    <>
      <ProfileHeader loggedUser={loggedUser} />

      <div className="flex flex-wrap justify-center items-center">
        {loggedUser.posts.map((post, index) => (
          <Card loggedUser={loggedUser} key={index} post={post} setCount={setCount}/>
        ))}
      </div>
    </>
  );
}
