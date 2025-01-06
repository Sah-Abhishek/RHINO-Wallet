import React, { useState } from "react";
import axios from "axios";  // Assuming axios is imported
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const CreatePassword = () => {
  const [inputValue, setInputValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { email } = useUserStore();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleUnlockClick = async () => {
    // Check if the passwords match
    if (inputValue !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return; // Exit if passwords don't match
    }

    try {
      const response = await axios.post('http://localhost:3000/saveCredential', { email: email ,password: inputValue });
      if(response.status === 201){
        navigate('/createWallet');
      }
      // Handle the response (if needed)
      // alert("Password saved successfully");
    } catch (error) {
      console.log("There was an error while checking password");
    }

    // Logic to unlock the page (you can replace this with actual functionality)
    // alert("Unlocking: " + inputValue);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex justify-center flex-col bg-white p-8 pb-12 rounded-xl shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img
            src="cropped_rhino.png" // Replace with your logo path
            alt="Logo"
            className="w-72 h-auto"
          />
        </div>
        <div className="mt-20 mb-10 text-center">
          <div className="font-bold text-3xl ">
            Create a Password
          </div>
          <div className="text-gray-600 font-bold mt-4">
            It should be at least 8 characters.<br />
            You’ll need this to unlock RHINO.
          </div>
        </div>

        {/* Password Input Element */}
        <input
          type="password"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border border-black rounded-md focus:outline-none"
        />

        {/* Confirm Password Input Element */}
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Password"
          className="w-full px-4 py-2 mb-4 border border-black rounded-md focus:outline-none"
        />
        {/* eye svg */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg> */}


        {/* Display error message */}
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        {/* Create Password Button */}
        <button
          onClick={handleUnlockClick}
          className=" text-white w-auto mt-4 py-2 px-4 flex items-center justify-center bg-black hover:bg-gray-800 font-semibold rounded-lg border border-black focus:outline-none"
        >
          Create Password
        </button>
      </div>
    </div>
  );
};

export default CreatePassword;
