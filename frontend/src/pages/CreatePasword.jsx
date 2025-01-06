import React, { useState } from "react";

const CreatePassword = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleUnlockClick = async () => {
    try{
        const response = await axios.post('http://localhost:3000/saveCredential', inputValue);

    }catch(error){
        console.log("There was an error while checking password");
    }
    // Logic to unlock the page (you can replace this with actual functionality)
    alert("Unlocking: " + inputValue);
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
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border border-black rounded-md focus:outline-none "
        />

        {/* Unlock Button */}
        <button
          onClick={handleUnlockClick}
          className="w-full py-2 px-4 flex items-center justify-center text-black font-semibold rounded-lg border border-black  focus:outline-none"
        >
          Create Password
        </button>
      </div>
    </div>
  );
};

export default CreatePassword;
