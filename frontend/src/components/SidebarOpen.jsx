import useUserStore from "../store/userStore";
import WalletCard from "./WalletCard";
import { generateWallet } from "../walletFunctions";
import { useEffect, useState } from "react";
import { Menu, Settings } from "lucide-react";
import ChangeWeb3Network from "./ChangeWeb3Network";
import ChangeWeb3NetworkPopup from "./ChangeWeb3NetworkPopup";
import { toast } from "react-hot-toast";

const SidebarOpen = ({ onClose }) => {
    const { name, image, email, wallets, solanaCurrentIndex, ethereumCurrentIndex, web3Network, mnemonic, setSolanaCurrentIndex, setEthereumCurrentIndex, addWallet } = useUserStore();
    const [filteredWallets, setFilteredWallets] = useState([]);
    const [isChangeNetworkPopupOpen, setIsChangeNetworkPopupOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleAddWallet = async () => {
        var returnedWallet;
        if (web3Network === "solana") {
            returnedWallet = await generateWallet(web3Network, mnemonic, solanaCurrentIndex, setSolanaCurrentIndex);
        } else if (web3Network === "ethereum") {
            returnedWallet = await generateWallet(web3Network, mnemonic, ethereumCurrentIndex, setEthereumCurrentIndex);
        }
        addWallet(web3Network, returnedWallet);
    };

    useEffect(() => {
        // console.log("Wallets are: ", wallets);

        // Filter out null or undefined elements and then filter by network
        const localWallet = wallets[web3Network];
        // console.log("These are the local wallets: ", localWallet);
        setFilteredWallets(localWallet);

        // console.log("This is the filteredWallets: ", filteredWallets);
    }, [wallets, web3Network]);

    const toggleChangeNetworkPopup = () => {
        setIsChangeNetworkPopupOpen(prev => !prev);

    };

    return (
        <div className="flex flex-col p-2 absolute top-0 right-0 m-0 h-screen overflow-hidden">
            <div className="border-2 border-black m-[2px] h-screen p-5 rounded-xl flex flex-col">
                <div className="flex items-center justify-start">
                    <img src={image} alt="pfp" className="rounded-full h-16 w-auto" />
                    <h1 className="ml-4 space-y-1">
                        <div className="text-base font-bold">{name}</div>
                        <div className="text-sm">{email}</div>
                    </h1>

                    <div onClick={onClose} className="absolute top-5 right-5 cursor-pointer">
                        <Menu />
                    </div>
                    <div onClick={() => setIsMenuOpen(true)} className="relative -top-3 right-5 cursor-pointer">
                        <Settings />
                    </div>
                </div>

                {/* Wallets display section */}
                <div>


                    <div className="flex-1 overflow-y-auto">
                        {filteredWallets.length > 0 ? (
                            filteredWallets.map((wallet, index) => (
                                <WalletCard key={index} wallet={wallet} />
                            ))
                        ) : (
                            <p>No wallets found</p>
                        )}
                    </div>

                    {/* Add new wallet button */}
                    <div onClick={handleAddWallet} className="text-blue-500 mt-4 flex justify-center text-lg cursor-pointer hover:text-blue-700">
                        <h2 className="">+ Add new Wallet</h2>
                    </div>
                    {/* <div className="flex justify-center font-bold text-white ">
                        <button className="bg-blue-500 rounded-lg px-4 py-2" onClick={handleClick}>Show Toast</button>

                    </div> */}

                </div>

                {/* Change Web3 Network at the bottom */}
                <div className="flex gap-y-2 flex-col mt-auto justify-center items-center">
                    {isChangeNetworkPopupOpen && <ChangeWeb3NetworkPopup onClose={setIsChangeNetworkPopupOpen} />}
                    <ChangeWeb3Network isChangeNetworkPopupOpen={isChangeNetworkPopupOpen} clickChangeNetwork={toggleChangeNetworkPopup} />
                </div>
                {isMenuOpen && (
                <div ref={menuRef} className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md p-2">
                    <ul>
                        <li>
                            <button onClick={handleRename} className="w-full text-left text-black hover:text-gray-600 py-1 px-2">Rename</button>
                        </li>
                        <li>
                            <button onClick={handleDelete} className="w-full text-left text-black hover:text-gray-600 py-1 px-2">Delete</button>
                        </li>
                        
                    </ul>
                </div>
            )}
            </div>
        </div>
    );
};

export default SidebarOpen;
