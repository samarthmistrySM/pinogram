import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Modal({ handleCloseModal, loggedUser, setCount }) {
  
  const [fullName, setFullName] = useState(loggedUser.fullname);
  const [avatar, setAvatar] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const avatarUrl = await uploadToCloudinary(avatar);
    const backgroundImageUrl = await uploadToCloudinary(backgroundImage);

    
    const formData = {
      fullName,
      avatarUrl,
      backgroundImageUrl,
    };

    try {
      const response = await axios.put('http://localhost:4000/api/users/update/'+loggedUser._id, formData);
      if (response) {
        setCount((count) => count + 1);
        toast.success(response.data, {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data, {
          position: "bottom-center",
        });
      } else {
        toast.error("Network Error", {
          position: "bottom-center",
        });
      }} finally {
      setIsUploading(false);
    }
  };

  const uploadToCloudinary = async (file) => {
    if (!file) return null;

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'gbxinum8');
      formData.append('cloud_name', 'pinorama');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/pinorama/image/upload',
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return null;
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg relative w-96">
        <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
        <button
          onClick={handleCloseModal}
          className="absolute top-0 right-0 m-4 font-bold text-gray-600 hover:text-gray-800"
        >
          X
        </button>
        <form onSubmit={handleSubmitForm}>
          <div className="grid gap-4 mb-4 sm:grid-cols-1">
            <div className="w-full">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="avatar"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Avatar Image
              </label>
              <input
                type="file"
                accept="image/*"
                name="avatar"
                id="avatar"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="backgroundImage"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Background Image
              </label>
              <input
                type="file"
                accept="image/*"
                name="backgroundImage"
                id="backgroundImage"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                onChange={(e) => setBackgroundImage(e.target.files[0])}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isUploading} 
          >
            {isUploading ? 'Uploading...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
