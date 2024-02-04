import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Upload() {
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  let cookie = Cookies.get("auth");
  let loggedUser;
  if (cookie) {
    loggedUser = JSON.parse(cookie);
  } else {
    if (!loggedUser) return (window.location = "/");
  }

  const handleImageUpload = async () => {
    const API_URL = "http://localhost:4000/api/";
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      setLoading(true); // Set loading to true when upload begins

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "gbxinum8");
      formData.append("cloud_name", "pinorama");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/pinorama/image/upload",
        formData
      );

      if (response.data && response.data.secure_url) {
        const imageUrl = response.data.secure_url;
        setImageUrl(imageUrl);

        const postData = {
          image: imageUrl,
          caption: caption,
          id: loggedUser._id,
        };

        try {
          await axios.post(API_URL + "posts", postData);
          toast.success("Post uploaded");
        } catch (error) {
          toast.error("Upload unsuccessful");
          console.log(error);
        }

        setSelectedFile(null);
        setCaption("");
      } else {
        console.error(
          "Error uploading image: No secure URL found in response"
        );
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  return (
    <div className="max-w-sm mx-auto bg-red-100 shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-6">
        <label className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <label
              htmlFor="fileInput"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="fileInput"
                name="fileInput"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
            <div className="mb-4">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-w-full h-auto mx-auto"
                />
              )}
            </div>
            <input
              type="text"
              value={caption}
              onChange={handleCaptionChange}
              placeholder="Enter caption"
              className="border border-gray-300 px-3 py-1 rounded-md"
              required
            />
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleImageUpload}
              disabled={!selectedFile || loading} 
            >
              {loading ? "Uploading..." : "Upload Image"} 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
