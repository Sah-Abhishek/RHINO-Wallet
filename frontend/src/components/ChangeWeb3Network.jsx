import useUserStore from "../store/userStore";

const ChangeWeb3Network = ({ isChangeNetworkPopupOpen, clickChangeNetwork }) => {
    const { web3Network } = useUserStore();

    return (
        <div 
            onClick={clickChangeNetwork}
            className="inline-flex border border-black p-3 px-4 rounded-full gap-x-3 bg-black text-white cursor-pointer"
        >
            <img src={`${web3Network}_logo.png`} alt="" className="h-7" />
            <h1 className="font-semibold">{web3Network}</h1>

            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className={`size-6 transition-transform ${isChangeNetworkPopupOpen ? "" : "rotate-180"}`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </div>
    );
}

export default ChangeWeb3Network;
