import React from "react";
import useUserStore from "../store/userStore";

const Mnemonic = () => {
    // const mnemonic = [
    //     "wallet", "bridge", "canvas", "deposit",
    //     "energy", "follow", "garden", "height",
    //     "island", "jungle", "kidney", "legend"
    // ];

    const { mnemonic } = useUserStore();
    console.log(mnemonic);

    const copyToClipboard = () => {
        const mnemonicString = mnemonic.join(" ");

        navigator.clipboard.writeText(mnemonicString)
            .then(() => {
                alert(`copied to clipboard!`); // Show an alert on success
            })
            .catch((error) => {
                console.error("Failed to copy: ", error); // Handle any error
            });
    };


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
                    <button className="text-white w-auto mt-8 py-2 px-10 flex items-center justify-center bg-black hover:bg-gray-800 font-semibold rounded-lg border border-black focus:outline-none">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Mnemonic;