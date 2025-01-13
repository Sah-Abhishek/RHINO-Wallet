import { DollarSign, DollarSignIcon, LucideIndianRupee } from "lucide-react";
import useUserStore from "../store/userStore";
import { IconBxDollar } from './DollarIcon'
import { useEffect, useState } from "react";
import { IconLucideIndianRupee } from "./RupeeIcon";
import { useNavigate } from "react-router-dom";


const CoinCard = ({ balance, balanceInUsd, coinName, coinPrice, currency }) => {

    const navigate = useNavigate();
    const { name, image, email, } = useUserStore();


    useEffect(() => {
        console.log("llllllllllllllllllllll", email, name, image);
        if (!name || !email || !image) {
            navigate('/signup');
        }
    }, [name, email, image, navigate]);
    
    
    const { web3Network, selectedWallet } = useUserStore();
    console.log("This is the balance: ", balance);

    const { currencySelected, } = useUserStore();
    console.log("This is the coinPrice: ", balanceInUsd);
    return (
        <div className="flex items-center justify-between rounded-3xl border-2 border-gray-800 bg-white p-4 w-96 shadow-lg">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center">
                    <img src={`${coinName}_logo.png`} className="h-8" />
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">{coinName[0].toUpperCase() + coinName.slice(1)}</span>
                    <div className="flex items-center">
                        {currency === 'usd' ? <IconBxDollar  /> : <IconLucideIndianRupee size={16} className="text-black" />}
                        ~
                        <span className="font-medium">{coinPrice[coinName][currencySelected]}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-black text-xl">{balance.toFixed(2)}</span>
                <div className="flex items-center">
                    {currency === 'usd' ? <IconBxDollar size={18} className="text-gray-600" /> : <IconLucideIndianRupee size={18} className="text-gray-600" />}
                    
                    <span className="text-gray-600">
                        {balanceInUsd[coinName].toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CoinCard;