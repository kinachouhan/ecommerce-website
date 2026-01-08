import { IoAddCircleOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { LuBookCheck } from "react-icons/lu";
import { NavLink } from "react-router-dom";

export const AdminSideBar = () => {
    return (
        <div className="w-full  lg:w-[280px]">
            <div className="
                flex
                flex-row md:flex-row lg:flex-col
                border-b md:border-b lg:border-b-0 lg:border-r
                border-black/20
                gap-2 md:gap-4 lg:gap-6
                p-2 md:p-3 lg:pt-8
            ">

                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `
                        flex flex-1 lg:flex-none
                        items-center justify-center lg:justify-start
                        gap-2 lg:gap-4
                        text-sm md:text-base lg:text-lg
                        px-3 py-2 lg:p-4
                        border border-black/20
                        ${isActive ? "bg-gray-500 text-white" : ""}
                        `
                    }
                >
                    <IoAddCircleOutline className="text-lg md:text-xl lg:text-2xl" />
                    <span>Add Items</span>
                </NavLink>

                <NavLink
                    to="list"
                    className={({ isActive }) =>
                        `
                        flex flex-1 lg:flex-none
                        items-center justify-center lg:justify-start
                        gap-2 lg:gap-4
                        text-sm md:text-base lg:text-lg
                        px-3 py-2 lg:p-4
                        border border-black/20
                        ${isActive ? "bg-gray-500 text-white" : ""}
                        `
                    }
                >
                    <FaList className="text-lg md:text-xl lg:text-2xl" />
                    <span>List Items</span>
                </NavLink>

                <NavLink
                    to="orders"
                    className={({ isActive }) =>
                        `
                        flex flex-1 lg:flex-none
                        items-center justify-center lg:justify-start
                        gap-2 lg:gap-4
                        text-sm md:text-base lg:text-lg
                        px-3 py-2 lg:p-4
                        border border-black/20
                        ${isActive ? "bg-gray-500 text-white" : ""}
                        `
                    }
                >
                    <LuBookCheck className="text-lg md:text-xl lg:text-2xl" />
                    <span>Orders</span>
                </NavLink>

            </div>
        </div>
    );
};
