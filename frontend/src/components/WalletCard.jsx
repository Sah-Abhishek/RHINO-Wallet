import { EllipsisVertical } from 'lucide-react';
import useUserStore from '../store/userStore';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast'; // Assuming you're using react-hot-toast for notifications

const WalletCard = ({ wallet }) => {
    const { selectedWallet, setSelectedWallet, web3Network, deleteWallet } = useUserStore();

    const [isMenuOpen, setIsMenuOpen] = useState(false);  // State to toggle menu visibility
    const menuRef = useRef(null);  // Reference for the menu

    const handleSelectWallet = () => {
        setSelectedWallet(wallet.index);  // Assuming wallet.index is the value to set
    };

    const handleCopy = async (event) => {
        event.stopPropagation();

        try {
            // Await the clipboard writeText method
            await navigator.clipboard.writeText(wallet.keyPair.publicKey);

            // Show success toast if the text is copied successfully
            toast.success("Text copied to clipboard!");
        } catch (err) {
            // Show error toast if the copy fails
            toast.error("Failed to copy text!");
            console.error("Copy failed", err);
        }
    };

    const handleMenuToggle = (event) => {
        event.stopPropagation();

        setIsMenuOpen((prevState) => !prevState);
    };

    const handleDelete = (event) => {
        event.stopPropagation();
        deleteWallet(wallet.index, web3Network);
        toast.error("Delete action triggered!");
        setIsMenuOpen(false);  // Close the menu after action
    };

    const handleRename = (event) => {
        event.stopPropagation();

        toast.success("Rename action triggered!");
        setIsMenuOpen(false);  // Close the menu after action
    };

    // Close the menu if clicking outside the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);  // Close the menu if clicked outside
            }
        };

        // Add event listener for mouse click
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            onClick={handleSelectWallet}
            className={`flex items-center border justify-between px-4 border-black mt-4 rounded-lg ${selectedWallet.index === wallet.index ? "bg-black text-white" : "bg-white text-black"} cursor-pointer`}>

            <div className="m-2">
                <img src={`${web3Network}_logo.png`} alt="" className="h-7" />
            </div>
            <div className='font-semibold'>
                {wallet.walletName}
            </div>
            <div onClick={(event) => handleCopy(event)} className=' transition-transform rounded-full p-2 hover:bg-gray-300'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    id="Duplicate--Streamline-Ultimate"
                    height={16}
                    width={16}
                >
                    <desc>{"Duplicate Streamline Icon: https://streamlinehq.com"}</desc>
                    <path
                        stroke={selectedWallet.index === wallet.index ? '#ffffff' : '#000000'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.75 4.5V1.75c0 -0.55228 -0.4477 -1 -1 -1h-14c-0.55228 0 -1 0.44771 -1 1v14c0 0.5523 0.44772 1 1 1H4.5"
                        strokeWidth={1.5}
                    />
                    <path
                        stroke={selectedWallet.index === wallet.index ? '#ffffff' : '#000000'}
                        strokeLinejoin="round"
                        d="M7.25 8.25c0 -0.55229 0.44772 -1 1 -1h14c0.5523 0 1 0.44772 1 1v14c0 0.5523 -0.4477 1 -1 1h-14c-0.55229 0 -1 -0.4477 -1 -1v-14Z"
                        strokeWidth={1.5}
                    />
                </svg>
            </div>

            <div onClick={handleMenuToggle}>
                <EllipsisVertical className="hover:text-gray-500 cursor-pointer" />
            </div>

            {/* Conditionally render the menu when isMenuOpen is true */}
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
    );
};

export default WalletCard;
