import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import useUserStore from "../store/userStore";
import { Buffer } from 'buffer';



const CreateWallet = () => {
    const navigate = useNavigate();
    const [selectedNetwork, setSelectedNetwork] = useState("solana");
    const [showPopup, setShowPopup] = useState(false);
    const { addMnemonic } = useUserStore();

    const handleCreateWallet = () => {
        // Logic for creating a wallet goes here
        console.log("Wallet created");

        // Navigate to the next page (e.g., dashboard or wallet details page)
        // navigate('/dashboard');
    };

    const handleNetworkClick = () => {
        // Toggle the selected network between Solana and Ethereum
        setSelectedNetwork(prevNetwork => prevNetwork === "solana" ? "ethereum" : "solana");
        setShowPopup(false);  // Close the popup after selection
    };

    // Set the appropriate logo based on the selected network
    const getNetworkLogo = (network) => {
        if (network === "solana") {
            return "solanaLogoMark.png";  // Solana logo
        } else if (network === "ethereum") {
            return "etherium_logo.png";  // Ethereum logo
        }
        return "";
    };

    const generateWallet = () => {
        // Generate the mnemonic phrase as a string
        const words = generateMnemonic();
        
        // Split the mnemonic string into an array of words by space
        const mnemonicWords = words.split(" ");
        
        // Log to verify the mnemonicWords is an array
        console.log("Mnemonic words as array: ", mnemonicWords);
        
        // Check if mnemonicWords is indeed an array
        if (Array.isArray(mnemonicWords)) {
            // Here, you can store the mnemonic words in your store or any other state
            addMnemonic(mnemonicWords); 
            // alert("Wallet Added");
            navigate('/mnemonic');
        } else {
            console.error("Mnemonic words were not split into an array correctly.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex items-center justify-center flex-col bg-white p-8 pb-12 rounded-xl shadow-lg w-96">
                <div className="flex justify-center items-center mb-6">
                    <img
                        src="cropped_rhino.png"
                        alt="Logo"
                        className="w-72 h-auto"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-center mb-6 text-red-700">RHINO Wallet</h2>

                <h2 className="text-center text-xl font-bold mt-4">Choose a network</h2>

                {/* Container for Solana network and Ethereum popup */}
                <div className="relative inline-flex items-center m-4 border border-black rounded-full px-5">
                    {/* Network button with dynamic logo */}
                    <div className="inline-flex items-center">
                        <img className={`${selectedNetwork === "solana" ? "h-5 w-5" : "h-5 w-3"}`} src={getNetworkLogo(selectedNetwork)} alt={`${selectedNetwork} Logo`} />
                        <div className="py-2 px-4 text-black font-semibold">
                            {selectedNetwork}
                        </div>
                    </div>

                    {/* Toggle button for Ethereum */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 cursor-pointer"
                        onClick={() => setShowPopup(!showPopup)}  // Toggle popup visibility
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>

                    {/* Ethereum network button (popup) */}
                    {showPopup && (
                        <button
                            onClick={handleNetworkClick}
                            className={`absolute left-1/2
                                
                             transform -translate-x-1/2 mt-28 inline-flex items-center mb-4 border border-black rounded-full px-5 py-2 z-10`}
                        >
                            <img className={`${selectedNetwork === "solana" ? "h-5 w-5" : "h-5 w-5"}`} src={selectedNetwork === "solana" ? "etherium_logo.png" : "solanaLogoMark.png"}
                                alt="Ethereum Logo" />
                            <div className="py-1 px-2 text-black font-semibold text-xs">
                                Ethereum
                            </div>
                        </button>
                    )}
                </div>

                {/* Create Wallet Button */}
                <div className="flex flex-col gap-y-3 justify-center w-full items-center m-4 mt-10">
                    <button
                        onClick={generateWallet}  // Trigger wallet creation logic when clicked
                        className="w-full py-2 px-4 text-white font-semibold rounded-full bg-black hover:bg-gray-800 transition duration-300 focus:outline-none flex items-center justify-center"
                    >
                        <span className="mr-2">Create a new Wallet</span>
                    </button>
                    <button
                        onClick={handleCreateWallet}  // Trigger wallet creation logic when clicked
                        className="w-full py-2 px-4 text-white font-semibold rounded-full bg-black hover:bg-gray-800 transition duration-300 focus:outline-none flex items-center justify-center"
                    >
                        <span className="mr-2">Import Existing Wallet</span>
                    </button>
                </div>

                {/* Optionally, you could add a message or instruction to the user */}
                <div className="mt-6 text-center text-gray-600">
                    <p>Creating a wallet will enable you to store your cryptocurrency safely.</p>
                </div>
            </div>
        </div>
    );
};

export default CreateWallet;
