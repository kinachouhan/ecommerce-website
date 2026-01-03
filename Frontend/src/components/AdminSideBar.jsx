import { IoAddCircleOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { LuBookCheck } from "react-icons/lu";
import { NavLink } from "react-router-dom";



export const AdminSideBar = () => {
    return (
        <div className="h-screen w-full">
            <div className=" w-[300px] border-r-1 h-full border-black/20 flex flex-col gap-8 pt-8">
                <div>
                    <NavLink to="/admin"
                        end
                        className={({ isActive }) =>
                            `flex gap-4 text-xl items-center justify-center p-4 border border-black/20 ${isActive ? "bg-gray-500 text-white" : ""
                            }`
                        }
                    ><IoAddCircleOutline className="text-3xl" /> <span>Add Items</span></NavLink>
                </div>
                <div>
                    <NavLink to="list"
                     className={({isActive})=> `flex gap-4 text-xl items-center justify-center p-4 border border-black/20 ${isActive ? "bg-gray-500 text-white" : ""} `}><FaList className="text-3xl" /> <span>List Items</span></NavLink>
                </div>
                <div>
                    <NavLink to="orders"
                     className={({isActive})=> `flex gap-4 text-xl items-center justify-center p-4 border border-black/20 ${isActive ? "bg-gray-500 text-white" : ""}`}><LuBookCheck className="text-3xl" /> <span>Orders</span></NavLink>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}