import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { Input } from "./Input";

const CreateResumeForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Title is required");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.CREATE, {
        title,
      });
      if (response.data?._id) {
        navigate(`/resume/${response.data?._id}`);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while creating the resume.");
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-100 m-6 p-6 ">
      <h3 className="text-2xl mb-2 border-gray-200">Create a New Resume</h3>
      <p className="text-gray-600 mb-8">
        Give a Title for your Resume, Also You can Change Every Thing later
        anytime.{" "}
      </p>
      <form action="" onSubmit={handleCreateResume}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter resume title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
