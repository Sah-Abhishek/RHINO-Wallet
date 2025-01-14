import React, { useEffect } from "react";
import useUserStore from "../store/userStore";
import { generateWallet } from "../walletFunctions";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Mnemonic = () => {

    const { mnemonic, addWallet, web3Network, setSolanaCurrentIndex, setEthereumCurrentIndex, setSelectedWallet, wallets, selectedWallet } = useUserStore();

    const navigate = useNavigate();
    
    
    // console.log(mnemonic);

    const copyToClipboard = async (event) => {
        event.stopPropagation();

        try {
            const mnemonicString = mnemonic.join(" ");

            // Await the clipboard writeText method
            await navigator.clipboard.writeText(mnemonicString);

            // Show success toast if the text is copied successfully
            toast.success("Mnemonic copied to clipboard!");
        } catch (err) {
            // Show error toast if the copy fails
            toast.error("Failed to copy mnemonic!");
            console.error("Copy failed", err);
        }
    };

    const clickNextHandler = async () => {
        var wallet;
        if (web3Network === "solana") {
            wallet = await generateWallet(web3Network, mnemonic, 0, setSolanaCurrentIndex);
        } else {
            wallet = await generateWallet(web3Network, mnemonic, 0, setEthereumCurrentIndex);
        }

        // console.log()

        console.log("This is the key Pair: ", wallet);
        addWallet(web3Network, wallet);
        setSelectedWallet(0);
        console.log("This is the wallet after addWallet: ", wallet);
    }

    useEffect(() => {
        if(wallets.solana.length >  0 || wallets.ethereum > 0){
            navigate('/');
        }
    }, [wallets]);

    useEffect(() => {
        setSelectedWallet(0);
        // console.log("aaaaaaaaaaaaaaaaa", wallets);
    }, [addWallet]);

    // Split the mnemonic string into an array of words
    // console.log(typeof mnemonicString, mnemonicString);
    // const mnemonicWords = mnemonic.split(" ");
    // console.log(typeof mnemonic);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 pb-12 rounded-xl shadow-lg w-[32rem]">
                <div className="flex justify-center items-center mb-6">
                    <img
                        src="cropped_rhino.png"
                        alt="Logo"
                        className="w-72 h-auto"
                    />
                </div>

                <h2 className="text-2xl font-semibold text-center mb-6 text-red-700">
                    RHINO Wallet
                </h2>

                <div className="grid grid-cols-4 gap-4 mb-6 cursor-pointer" onClick={copyToClipboard}>
                    {mnemonic.map((word, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-3 rounded-lg text-center text-sm border hover:bg-gray-100 transition-colors"
                        >
                            {word}
                        </div>
                    ))}

                </div>
                <div className="flex gap-x-4 pl-2 text-sm text-gray-700 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Duplicate--Streamline-Ultimate" height={16} width={16} ><desc>{"Duplicate Streamline Icon: https://streamlinehq.com"}</desc><path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="M16.75 4.5V1.75c0 -0.55228 -0.4477 -1 -1 -1h-14c-0.55228 0 -1 0.44771 -1 1v14c0 0.5523 0.44772 1 1 1H4.5" strokeWidth={1.5} /><path stroke="#000000" strokeLinejoin="round" d="M7.25 8.25c0 -0.55229 0.44772 -1 1 -1h14c0.5523 0 1 0.44772 1 1v14c0 0.5523 -0.4477 1 -1 1h-14c-0.55229 0 -1 -0.4477 -1 -1v-14Z" strokeWidth={1.5} /></svg>
                    <p>Click Anywhere to copy</p>

                </div>

                <div className="flex justify-center items-center">
                    <button onClick={clickNextHandler} className="text-white w-auto mt-8 py-2 px-10 flex items-center justify-center bg-black hover:bg-gray-800 font-semibold rounded-lg border border-black focus:outline-none">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Mnemonic;