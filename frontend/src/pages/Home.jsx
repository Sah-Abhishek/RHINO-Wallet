import { useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import axios from "axios";
import SidebarClosed from "../components/SidebarClosed";
import SidebarOpen from "../components/SidebarOpen";


const Home = () => {

    const { name, image, email, setSelectedWallet, selectedWallet, wallet, web3Network } = useUserStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [balance, setBalance] = useState(0);
    const [networkWallets, setNetworkWallets] = useState([]);

    useEffect(() => {
        const filteredWallets = wallet.filter(wallet => wallet.network === web3Network);
        console.log("This is the filteredWallets: ", filteredWallets);


    }, [])


    useEffect(() => {
        setSelectedWallet();

    }, [])


    const getBalance = async () => {
        try {
            const response = await axios.post('http://localhost:3000/getBalance', {
                network: selectedWallet.network,
                publicKey: selectedWallet.keyPair.publicKey
            });

            // console.log("This is the response from backend: ", response.data.data.result.value);

            // Check if the response contains the expected structure
            if (response.data.data && response.data.data.result && response.data.data.result.value !== undefined) {
                setBalance(response.data.data.result.value / 1000000000);
                // console.log("This is balance from getBalance: ", response.data.data.result.value);
            } else {
                console.log("Error: 'result.value' is not found in the response");
            }
        } catch (error) {
            console.log("There was some error: ", error);
        }
    };


    useEffect(() => {
        getBalance();
        // console.log("This is the balance: ", balance);

        // console.log(selectedWallet)
    }, [])


    return (
        <div>
            <img src="cropped_rhino.png" alt="" className=" m-4 h-16 w-auto absolute" />
            {isSidebarOpen ? <SidebarOpen onClose={() => setIsSidebarOpen(false)} /> : <SidebarClosed onClose={() => setIsSidebarOpen(true)} />}
            <div className="flex h-screen justify-center items-center">
                <div className="flex flex-col justify-center items-center  rounded-lg h-auto w-auto p-10">
                    <div className="flex items-center p-5 w-96">
                        <img src={image} alt="pfp" className="rounded-full" />

                        <div className="px-4 text-3xl font-bold">
                            {name}
                            <div className="inline-flex border border-black rounded-lg p-2 w-auto gap-x-3 items-center mt-3">
                                <img src={`${selectedWallet.network}_logo.png`} alt="" className="h-5" />
                                <p className="text-sm">{selectedWallet.walletName}</p>
                            </div>
                        </div>

                    </div>
                    <div className=" w-full pl-6 mb-4">
                        <p className="font-bold text-3xl">  {balance === 0 ? "0   Sol" : balance.toFixed(4) + "   Sol"}
                        </p>
                    </div>
                    {/* buttons */}
                    <div className="flex items-center gap-x-6 justify-around w-full">
                        <div className="flex items-center flex-col">
                            <div className="border-2 border-black rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                </svg>

                            </div>
                            <p className="text-lg font-bold">Send</p>
                        </div>
                        <div className="flex items-center flex-col">
                            <div className="border-2 border-black rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                </svg>


                            </div>
                            <p className="text-lg font-bold">Recieve</p>
                        </div>
                        <div className="flex items-center flex-col">
                            <div className="border-2 border-black rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                </svg>



                            </div>
                            <p className="text-lg font-bold">Swap</p>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
