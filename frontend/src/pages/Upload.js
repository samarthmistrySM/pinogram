import React, { useState } from "react";
import Cookies from "js-cookie";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

  let cookie = Cookies.get("auth");
  let loggedUser;
  if (cookie) {
    loggedUser = JSON.parse(cookie);
  } else {
    if (!loggedUser) return (window.location = "/");
  }

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    // Logic for file upload goes here
    console.log("File Uploaded:", selectedFile);
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          Choose a file
        </label>
        <input
          type="file"
          id="file"
          onChange={fileSelectedHandler}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
        />
      </div>
      <div>
        {selectedFile && (
          <div className="flex items-center">
            <span className="mr-2 h-6 w-6 rounded-full bg-green-100 flex justify-center items-center">
              <svg
                className="h-4 w-4 text-green-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-gray-700">{selectedFile.name}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={fileUploadHandler}
          className={`w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
