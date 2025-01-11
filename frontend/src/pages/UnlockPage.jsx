import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const UnlockPage = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const { email } = useUserStore();
  const [loading, setLoading] = useState(false);
  
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleUnlockClick = async () => {
    // console.log("This is the email: ", email);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/checkCredential', {
        email, inputValue
      });

      // If password is incorrect (401 status), display an error message
      if (response.status === 401) {
        setErrorMsg("Password Incorrect");
      }

      console.log("This is the response: ", response.error);

      // If the status is 200 (successful login)
      if (response.status === 200) {
        sessionStorage.setItem('sessionActive', true);
        navigate('/');
      }

    } catch (error) {
      setErrorMsg("Incorrect Password");
      console.log("There was an error while checking password", error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 pb-12 rounded-xl shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <img
            src="rhino_logo-ezgif.com-webp-to-jpg-converter-removebg-preview.png" // Replace with your logo path
            alt="Logo"
            className="w-72 h-72"
          />
        </div>

        {/* Input Element */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border border-black rounded-md focus:outline-none "
        />

        {/* Unlock Button */}
        <button
          onClick={handleUnlockClick}
          className="w-full py-2 px-4 flex items-center justify-center text-white bg-black hover:bg-gray-900 font-semibold rounded-lg border border-black  focus:outline-none"
        >
          {loading ? "loading" : "Unlock"}
        </button>

        {/* Error Message */}
        {errorMsg && (
          <div className="mt-4 text-center text-red-500 text-sm font-bold">
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnlockPage;
