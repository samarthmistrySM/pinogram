import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="bg-white rounded-lg m-4">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            &copy; 2023{" "}
            <a href="/" className="hover:underline text-red-600">
              Pinorama
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
            <li>
              <a href="https://github.com/samarthmistrySM/" className="hover:underline me-4 md:me-6">
              Github
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/samarthmistry311/" className="hover:underline me-4 md:me-6">
                Linked In
              </a>
            </li>
            <li>
              <a href="tel:9408618999" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
