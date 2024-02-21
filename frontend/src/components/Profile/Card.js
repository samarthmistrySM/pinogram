import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaThumbsUp, FaThumbsDown, FaComment, FaTrash } from "react-icons/fa";

export default function Card({ post, index, setCount, loggedUser }) {
  const API_URL = "http://localhost:4000/api/";

  const handleLike = async () => {
    try {
      const response = await axios.put(
        API_URL + "posts/like/?postId=" + post._id + "&userId=" + loggedUser._id
      );
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
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        API_URL + "posts/delete/?postId=" + post._id + "&userId=" + loggedUser._id
      );

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
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-4">
      <div key={index} className="overflow-hidden rounded-lg shadow-lg">
        <img src={post.image} alt={post.caption} className="w-full h-72 object-cover" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{post.caption}</div>
          <p className="text-gray-700 text-base">
            Created at {new Date(post.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-700 text-base">Likes: {post.likes.length}</p>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleLike}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {post.likes.includes(loggedUser._id) ? (
                <>
                <FaThumbsDown className="mr-2" />
                Dislike
              </>
              ) : (
                
                <>
                <FaThumbsUp className="mr-2" />
                Like
              </>
              )}
            </button>

            <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              <FaComment className="mr-2" /> Comment
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
