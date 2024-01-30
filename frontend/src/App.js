import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import Footer from "./components/Footer";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [users, setUsers] = useState([]);
  const API_URL = "http://localhost:4000/api/users";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
        const authCookie = Cookies.get("auth");
        if (authCookie) {
          const userData = JSON.parse(authCookie);
          console.log(userData);
          setIsLoggedin(true);
          setLoggedUser(userData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    setIsLoggedin(false);
    console.log(isLoggedin);
    Cookies.remove("auth");
    setLoggedUser({});
  };  

  return (
    <div className="App">
      <BrowserRouter>
      <Header isLoggedin={isLoggedin} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/" element={isLoggedin ? <Navigate to='/home'/> :
            <Login users={users} setIsLoggedin={setIsLoggedin} setLoggedUser={setLoggedUser} />}
          />
        <Route
            path="/profile"
            element={<Profile loggedUser={loggedUser}/>}
          />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/home"
            element={<Home /> }
          />
          <Route
            path="/upload"
            element={<Upload /> }
          />
          <Route
            path="/search"
            element={ <Search /> }
          />
         
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
