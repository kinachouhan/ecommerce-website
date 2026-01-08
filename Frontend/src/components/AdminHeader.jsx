import { TbHexagonLetterKFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const AdminHeader = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await fetch("http://localhost:3200/api/v1/users/logout", {
            method: "DELETE",
            credentials: "include",
        });
        navigate("/login");
    };

    return (
        <div className="">
            <div className="flex justify-between items-center px-4 sm:px-10 py-4 sm:py-6">
                
                <div className="">
                    <h1 className="flex items-center text-xl sm:text-3xl font-semibold">
                        <TbHexagonLetterKFilled />
                        <span className="ml-1">Kina's Store</span>
                    </h1>
                    <h1 className="text-gray-700 text-xs sm:text-base">
                        ADMIN PANEL
                    </h1>
                </div>

                <div className="flex gap-6 cursor-pointer">
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer bg-gray-500 text-white px-4 sm:px-6 font-bold py-2 rounded-sm text-sm sm:text-base"
                    >
                        Logout
                    </button>
                </div>

            </div>

            <div className="h-[1px] w-full bg-black/20"></div>
        </div>
    );
};
