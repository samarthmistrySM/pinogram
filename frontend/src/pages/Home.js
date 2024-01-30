import React from "react";
import Cookies from "js-cookie";

export default function Home() {
  let cookie = Cookies.get("auth");
  let loggedUser;
  if (cookie) {
    loggedUser = JSON.parse(cookie);
  } else {
    if (!loggedUser) return (window.location = "/");
  }

  return <div>Home</div>;
}
