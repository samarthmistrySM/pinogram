import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  const [users, setUsers] = useState([]);
  const API_URL = "http://localhost:4000/api/users";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/" element={ isLoggedin ? <Navigate to="/home" /> :  
            <Login users={users} setIsLoggedin={setIsLoggedin} />}
          />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/home"
            element={isLoggedin ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/upload"
            element={isLoggedin ? <Upload /> : <Navigate to="/" />}
          />
          <Route
            path="/search"
            element={isLoggedin ? <Search /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={isLoggedin ? <Profile /> : <Navigate to="/" />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
