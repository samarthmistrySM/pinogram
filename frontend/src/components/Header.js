import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../pinorama.png";

export default function Header({handleLogout}) {
  return (
    <div>
      <div>
        <nav className="bg-white border-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-8" alt="Pinorama Logo" />
              <NavLink to='/' className="logo self-start text-gray-300 text-xl font-semibold whitespace-nowrap">
                Pinorama 2.0
              </NavLink>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-user"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                <li>
                  <NavLink
                    to="/home"
                    className={`block py-2 pl-3 pr-4  md:hover:text-red-600 md:p-0 `}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/search"
                    className={`block py-2 pl-3 pr-4  md:hover:text-red-600 md:p-0 `}
                  >
                    Search
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={`block py-2 pl-3 pr-4  md:hover:text-red-600 md:p-0 `}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button className="text-red-800" onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
