import { TbHexagonLetterKFilled } from "react-icons/tb";



export const AdminHeader = () => {
    return (
        <div className="">
            <div className=" flex justify-between items-center px-10 p-6">
                <div className="">
                    <h1 className="flex items-center text-3xl font-semibold"><TbHexagonLetterKFilled /> <span>Kina's Store</span></h1>
                    <h1 className="text-gray-700">ADMIN PANEL</h1>
                </div>
                <div className="flex gap-6 cursor-pointer">
                    <button className="bg-gray-500 text-white px-6 font-bold  p-2 rounded-sm">Logout</button>
                </div>

            </div>
            <div className="h-[1px] w-full bg-black/20">
            </div>
        
        </div>
    )
}