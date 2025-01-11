
import { EllipsisVertical } from 'lucide-react';
import useUserStore from '../store/userStore';
import { useEffect } from 'react';

const WalletCard = ({ wallet }) => {
    const { selectedWallet, setSelectedWallet, web3Network } = useUserStore();
    // const [isCardSelected, setIsCardSelected] = useState()
    // console.log("This is the web3wallet: ", web3Network);

    const handleSelectWallet = () => {
        setSelectedWallet(wallet.index);  // Assuming wallet.index is the value to set
    };

    // If you need to log after the state is updated, use useEffect
    // useEffect(() => {
    //     console.log("Selected wallet: ", selectedWallet);
    // }, [selectedWallet]); // This will run whenever `selectedWallet` changes

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
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Duplicate--Streamline-Ultimate" height={16} width={16} ><desc>{"Duplicate Streamline Icon: https://streamlinehq.com"}</desc><path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="M16.75 4.5V1.75c0 -0.55228 -0.4477 -1 -1 -1h-14c-0.55228 0 -1 0.44771 -1 1v14c0 0.5523 0.44772 1 1 1H4.5" strokeWidth={1.5} /><path stroke="#000000" strokeLinejoin="round" d="M7.25 8.25c0 -0.55229 0.44772 -1 1 -1h14c0.5523 0 1 0.44772 1 1v14c0 0.5523 -0.4477 1 -1 1h-14c-0.55229 0 -1 -0.4477 -1 -1v-14Z" strokeWidth={1.5} /></svg>
            </div>
            <div>
                <EllipsisVertical />
            </div>

        </div>
    )
}

export default WalletCard;