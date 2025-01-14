import { useEffect, useRef, useState } from "react";
import useUserStore from "../store/userStore";
import axios from "axios";
import SidebarClosed from "../components/SidebarClosed";
import SidebarOpen from "../components/SidebarOpen";
import { useNavigate } from "react-router-dom";
import CoinCard from "../components/CoinCard";
import { IconBxDollar } from "../components/DollarIcon";
import { IconLucideIndianRupee } from "../components/RupeeIcon";
import PublicKeyQRModal from "../components/PublicKeyqrModal";

const Home = () => {
    const { name, image, email, setSelectedWallet, selectedWallet, web3Network, } = useUserStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [balance, setBalance] = useState(0);
    const [balanceInUsd, setBalanceInUsd] = useState({ ethereum: 0, solana: 0 });
    const [balanceInInr, setBalanceInInr] = useState({ ethereum: 0, solana: 0 });
    const [loadingBalance, setLoadingBalance] = useState(false);
    const currencySelected = 'usd';
    const menuRef = useRef(null);
    const [coinPrice, setCoinPrice] = useState({
        solana: {
            inr: 0,
            usd: 0
        },
        ethereum: {
            inr: 0,
            usd: 0
        }
    })
    const navigate = useNavigate(); // To programmatically navigate the user
    const [qrModalOpen, setQrModalOpen] = useState(false);



    // useEffect(() => {
    //     console.log("This is executing: ");
    //     if (!name || !email || !image) {
    //         navigate('/signup');
    //     }
    // }, [name, email, image, navigate]);

    useEffect(() => {
        // Check if the session exists

        const session = sessionStorage.getItem('sessionActive');
        if (!session) {
            navigate("/unlockPage");
        }
    }, [navigate]);

    useEffect(() => {
        setSelectedWallet(0);
    }, [setSelectedWallet]);

    const getBalance = async () => {
        try {
            setLoadingBalance(true);

            // Fetch the balance of the selected wallet
            

            // Fetch the price data (USD and INR) for Solana and Ethereum
            const currencyResponse = await axios.post('http://localhost:3000/getCoinPrice', {
                network: web3Network
            });

            let response;
            // if (selectedWallet.keyPair.publicKey) {
                response = await axios.post('http://localhost:3000/getBalance', {
                    network: web3Network,
                    publicKey: selectedWallet.keyPair.publicKey
                });
            // }


            if (response.status === 200) {
                if (currencyResponse.data && currencyResponse.data.price) {
                    setCoinPrice(currencyResponse.data.price);
                    if (currencyResponse.data.price.solana) {
                        setBalanceInInr(prevState => ({
                            ...prevState,
                            solana: currencyResponse.data.price.solana.inr
                        }));
                        setBalanceInUsd(prevState => ({
                            ...prevState,
                            solana: currencyResponse.data.price.solana.usd
                        }));
                    }
                    if (currencyResponse.data.price.ethereum) {
                        if (web3Network === "ethereum") {
                            setBalanceInInr(prevState => ({
                                ...prevState,
                                ethereum: currencyResponse.data.price.ethereum.inr * response.data.balance
                            }));
                        } else {
                            setBalanceInUsd(prevState => ({
                                ...prevState,
                                ethereum: currencyResponse.data.price.ethereum.usd
                            }));
                        }
                    }
                }
            }

            // Calculate the balance in SOL or ETH
            if (response.data && response.data.balance !== undefined) {
                if (response.data.network === "solana") {
                    const solBalance = response.data.balance / 1000000000; // Convert from lamports to SOL
                    setBalance(solBalance);
                    setBalanceInUsd(prevState => ({
                        ...prevState,
                        solana: solBalance * currencyResponse.data.price.solana.usd
                    }));
                    setBalanceInInr(prevState => ({
                        ...prevState,
                        solana: solBalance * currencyResponse.data.price.solana.inr
                    }));
                } else if (response.data.network === "ethereum") {
                    const ethBalance = Number(response.data.balance) / (1e18); // Convert from wei to ETH
                    setBalance(ethBalance);
                    setBalanceInUsd(prevState => ({
                        ...prevState,
                        ethereum: ethBalance * currencyResponse.data.price.ethereum.usd
                    }));
                    setBalanceInInr(prevState => ({
                        ...prevState,
                        ethereum: ethBalance * currencyResponse.data.price.ethereum.inr
                    }));
                }
            }
        } catch (error) {
            console.log("There was some error: ", error);
        } finally {
            setLoadingBalance(false);
        }
    };

    useEffect(() => {
        if (selectedWallet && web3Network) {
            getBalance();
        }
    }, [web3Network, selectedWallet]);

    return (
        <div>
            <img src="cropped_rhino.png" alt="" className="m-4 h-16 w-auto absolute" />
            {isSidebarOpen ? <SidebarOpen onClose={() => setIsSidebarOpen(false)} /> : <SidebarClosed onClose={() => setIsSidebarOpen(true)} />}
            <div className="flex h-screen justify-center items-center">
                <div className="flex flex-col justify-center items-center rounded-lg h-auto w-auto p-10">
                    <div className="flex items-center p-5 w-96">
                        <img src={image} alt="pfp" className="rounded-full" />
                        <div className="px-4 text-3xl font-bold">
                            {name}
                            <div className="inline-flex border border-black rounded-lg p-2 w-auto gap-x-3 items-center mt-3">
                                <img src={`${web3Network}_logo.png`} alt="" className="h-5" />
                                <p className="text-sm">{selectedWallet.walletName}</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full pl-6 mb-4">
                        {loadingBalance ? (
                            <div className="flex flex-row gap-2 h-11 items-center">
                                <div className="w-4 h-4 rounded-full bg-black animate-bounce"></div>
                                <div
                                    className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.3s]"
                                ></div>
                                <div
                                    className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.5s]"
                                ></div>
                            </div>

                        ) : (
                            <div className="text-4xl font-bold">
                                {web3Network === "solana" ? (
                                    currencySelected === 'usd' ? (
                                        <p className="inline-flex items-center">
                                            <IconBxDollar size={35} strokeWidth={3} className="mr-1" />
                                            {balanceInUsd.solana.toFixed(2)}
                                            <span className="text-gray-700 text-2xl">&nbsp;USD</span>
                                        </p>
                                    ) : (
                                        <p className="inline-flex items-center">
                                            <IconLucideIndianRupee />
                                            {balanceInInr.solana.toFixed(2)}
                                            <span className="text-gray-700 text-2xl"> INR</span>
                                        </p>
                                    )
                                ) : (
                                    currencySelected === 'usd' ? (
                                        <p className="inline-flex items-center">
                                            <IconBxDollar size={35} strokeWidth={3} className="mr-1" />
                                            {balanceInUsd.ethereum.toFixed(2)}
                                            <span className="text-gray-700 text-2xl">&nbsp;USD</span>
                                        </p>
                                    ) : (
                                        <p className="inline-flex items-center">
                                            <IconLucideIndianRupee />
                                            {balanceInInr.ethereum.toFixed(2)}
                                            <span className="text-gray-700 text-2xl"> INR</span>
                                        </p>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    {/* buttons */}
                    <div className="flex items-center mt-5 gap-x-6 justify-around w-full">
                        <div className="flex items-center flex-col cursor-not-allowed">
                            <div className="border-2 border-black rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                </svg>
                            </div>
                            <p className="text-lg font-bold">Send</p>
                        </div>
                        <div onClick={() => setQrModalOpen(true)} className="flex items-center flex-col ">
                            <div className="border-2 border-black rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                </svg>
                            </div>
                            <p className="text-lg font-bold">Receive</p>
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
                    <div className="mt-16 space-y-7">
                        <CoinCard
                            coinName={web3Network}
                            balance={balance}
                            balanceInUsd={balanceInUsd}
                            coinPrice={coinPrice}
                            currency={currencySelected}
                        />

                    </div>
                    <PublicKeyQRModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} publicKey={selectedWallet.keyPair.publicKey}/>
                </div>
            </div>
        </div>
    );
};

export default Home;
