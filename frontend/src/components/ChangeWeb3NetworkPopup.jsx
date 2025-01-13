import useUserStore from "../store/userStore";

const ChangeWeb3NetworkPopup = ({ onClose }) => {
    const { web3Network, setWeb3Network, setSelectedWallet, wallets } = useUserStore();

    const toggleWeb3Network = () => {
        web3Network === "solana" ? setWeb3Network("ethereum") : setWeb3Network("solana");
        setSelectedWallet(0);
        console.log("Web3Network toggled")
        onClose();
    }

    return (
        <div onClick={toggleWeb3Network} className="inline-flex border border-black p-3 px-4 rounded-full gap-x-3 text-black cursor-pointer">
            <img src={`${web3Network === "solana" ? "ethereum" : "solana"}_logo.png`} alt="" className="h-7" />
            <h1 className="font-semibold">{web3Network === "solana" ? "ethereum" : "solana"}</h1>


        </div>
    )
}

export default ChangeWeb3NetworkPopup;