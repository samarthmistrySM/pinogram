import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Feed from "./pages/Feed";

function App() {
  const [count, setCount] = useState(1);
  
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [users, setUsers] = useState([]);
  const API_URL = "http://localhost:4000/api/users";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);

        const Token = await  JSON.parse(localStorage.getItem('token'))
        
        const userEmail = Token.email;
        const userPassword = Token.password;

        const user = await fetchedUsers.find(user => user.email === userEmail && user.password === userPassword);
        
        if(user){
          setIsLoggedin(true);
          setLoggedUser(user)
        }else{
          setIsLoggedin(false)
        }

        if (count > 1) {
          const userExists = await fetchedUsers.find(
            (user) => user.username === loggedUser.username
          );
          if (userExists) {
            setLoggedUser(userExists);
          }
          setIsLoggedin(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [count, loggedUser.username]);

  const handleLogout = () =>{
    localStorage.removeItem('token');
    setIsLoggedin(false);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header handleLogout={handleLogout}/>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedin ? (
                <Navigate to="/home" />
              ) : (
                <Login
                  users={users}
                  setIsLoggedin={setIsLoggedin}
                  setLoggedUser={setLoggedUser}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedin ? (
                <Profile loggedUser={loggedUser} setCount={setCount}/>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/signup" element={<Register setCount={setCount} />} />
          <Route
            path="/home"
            element={isLoggedin ? <Home users={users} setCount={setCount} count={count} loggedUser={loggedUser} /> : <Navigate to="/" />}
          />
          <Route
            path="/search"
            element={isLoggedin ? <Search /> : <Navigate to="/" />}
          />
          <Route
            path="/feed"
            element={ <Feed />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
