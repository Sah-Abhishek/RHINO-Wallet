import useUserStore from "../store/userStore";

const SidebarClosed = ({ onClose }) => {
    const { image, } = useUserStore();

    return (
        <div
        onClick={onClose}
        className="flex items-center absolute top-0 right-0 m-3 border-2 border-black rounded-lg cursor-pointer">
            <img src={image} className="rounded-lg m-1 h-7 w-7" />
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>

            </div>


        </div>
    )
}

export default SidebarClosed;