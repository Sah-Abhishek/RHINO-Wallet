import React, { useState } from "react";
import useUserStore from "../store/userStore";
import { generateWallet } from "../walletFunctions";
import { useNavigate } from "react-router-dom";


const ImportWallet = () => {
    const { addMnemonic, setWeb3Network, web3Network, addWallet, setSolanaCurrentIndex, setSelectedWallet, setEthereumCurrentIndex} = useUserStore();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedNetwork, setSelectedNetwork] = useState(web3Network);
    const [mnemonic, setMnemonic] = useState(Array(12).fill("")); // Array to hold the 12 words
    const navigate = useNavigate();

    const getNetworkLogo = (network) => {
        if (network === "solana") {
            return "solana_logo.png";  // Solana logo
        } else if (network === "ethereum") {
            return "ethereum_logo.png";  // Ethereum logo
        }
        return "";
    };

    const handleNetworkClick = () => {
        // console.log("Before toggling: web3Network:", web3Network, " selectedNetwork:", selectedNetwork);

        // Toggle the selected network (update selectedNetwork)
        const newNetwork = selectedNetwork === "solana" ? "ethereum" : "solana";
        setSelectedNetwork(newNetwork); // Update local state (selectedNetwork)
        setWeb3Network(newNetwork); // Immediately sync the Zustand store state (web3Network)

        // console.log("After toggling: web3Network:", newNetwork, " selectedNetwork:", newNetwork);
        setShowPopup(false);  // Close the popup after selection
    };

    // Handle change for each input
    const handleMnemonicChange = (e, index) => {
        const newMnemonic = [...mnemonic];
        newMnemonic[index] = e.target.value;
        setMnemonic(newMnemonic); // Update the state with the new mnemonic
    };

    // Handle paste event: split the string into words and update state
    const handlePaste = (e) => {
        // Get the pasted text
        e.preventDefault();

        const pastedText = e.clipboardData.getData("Text");

        // Split the text by spaces and limit to 12 words
        const words = pastedText.split(/\s+/).slice(0, 12);

        // Update the mnemonic array state with the split words
        setMnemonic(words);
    };

    const handleGenerateWallet = async () => {
        // Generate the mnemonic phrase as a string
        // const words = generateMnemonic();

        // Split the mnemonic string into an array of words by space
        // const mnemonicWords = mnemonic.split(" ");

        // Log to verify the mnemonicWords is an array
        // console.log("Mnemonic words as array: ", mnemonicWords);

        // Check if mnemonicWords is indeed an array
        if (Array.isArray(mnemonic)) {
            // Here, you can store the mnemonic words in your store or any other state
            addMnemonic(mnemonic);
            var wallet;
            if (web3Network === "solana") {
                wallet = await generateWallet(web3Network, mnemonic, 0, setSolanaCurrentIndex);
            } else {
                wallet = await generateWallet(web3Network, mnemonic, 0, setEthereumCurrentIndex);
            }

            addWallet(web3Network, wallet);
            setSelectedWallet(0);
            // alert("Wallet Added");
            navigate('/mnemonic');
        } else {
            console.error("Mnemonic words were not split into an array correctly.");
        }

    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 pb-12 rounded-xl shadow-lg w-96">
                <div className="flex justify-center items-center mb-6">
                    <img
                        src="cropped_rhino.png"
                        alt="Logo"
                        className="w-72 h-auto"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-center mb-6 text-red-700">RHINO Wallet</h2>

                <div className="flex flex-col justify-center items-center">
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
                                onClick={() => handleNetworkClick()}
                                className={`absolute left-1/2 transform -translate-x-1/2 mt-28 inline-flex items-center mb-4 border border-black rounded-full px-5 py-2 z-10`}
                            >
                                <img className={`${selectedNetwork === "solana" ? "h-5 w-5" : "h-5 w-5"}`} src={selectedNetwork === "solana" ? "ethereum_logo.png" : "solana_logo.png"}
                                    alt="Ethereum Logo" />
                                <div className="py-1 px-2 pr-3 text-black font-semibold text-xs">
                                    {selectedNetwork === "solana" ? "ethereum" : "solana"}
                                </div>
                            </button>
                        )}
                    </div>

                    {/* Secret phrase input */}
                    <div className="w-full mb-6">
                        <h3 className="text-lg font-semibold mb-4">Enter 12 word Secret Phrase</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {mnemonic.map((word, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={word}
                                    onChange={(e) => handleMnemonicChange(e, index)}
                                    onPaste={handlePaste} // Handle paste for all input fields
                                    className="p-2 border rounded-md w-full"
                                    placeholder={`${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Google login button (without logic) */}
                    <div className="flex justify-center w-full items-center">
                        <button onClick={handleGenerateWallet} className="bg-black text-white px-4 font-bold hover:bg-gray-800 py-3 rounded-lg">
                            Generate Wallet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportWallet;
