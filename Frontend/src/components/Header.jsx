import { NavLink } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { TbHexagonLetterKFilled } from "react-icons/tb";
import { Wrapper } from "./Wrapper";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { setSearchInput } from "../redux/productSlice.js";
import { useLocation } from "react-router-dom";
import {logout} from "../redux/authSlice.js"

export const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("");
    const location = useLocation();
    const cartCount = useSelector(state =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    const [open, setOpen] = useState(false)

    const { isAuthenticated } = useSelector(state => state.auth)
    const handleLogout = async () => {
        try {
            await fetch("http://localhost:3200/api/v1/users/logout", {
                method: "DELETE",
                credentials: "include",
            });

            dispatch(logout());
         
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const handleSearch = (e) => {
        if (location.pathname !== "/collection") {
            navigate("/collection")
        }
        setSearchText(e.target.value)
        if (e.target.value.trim() === "") {
            dispatch(setSearchInput(""));
        }
    }

    const handleSearchBtn = () => {
        if (!searchText.trim()) return
        dispatch(setSearchInput(searchText))
    }


    return (
        <Wrapper>
            <div className=" flex justify-between items-center py-8">
                <div className="">
                    <h1 className="flex items-center text-3xl font-semibold"><TbHexagonLetterKFilled /> <span>Kina's Store</span></h1>
                </div>
                <div className="flex gap-6 cursor-pointer">
                    <NavLink className={({ isActive }) => isActive ? "underline" : ""} to="/">Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "underline" : ""} to="/collection">Collection</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "underline" : ""} to="/about">About</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "underline" : ""} to="/contact">Contact</NavLink>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="border border-gray-400 flex items-center p-1 rounded-sm">
                        <input
                            value={searchText}
                            onChange={handleSearch}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearchBtn();
                                }
                            }}

                            className="outline-none" placeholder="Search Here..." />
                        <button
                            onClick={handleSearchBtn}
                        >< CiSearch className="text-2xl cursor-pointer" /></button>
                    </div>
                    <div className="relative p-2"
                        onMouseEnter={() => isAuthenticated && setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                    >
                        <button
                            onClick={() => { if (!isAuthenticated) navigate("/login") }}
                            className="text-2xl cursor-pointer"><CgProfile /></button>

                        {
                            isAuthenticated && open
                            &&
                            (
                                <div className="absolute right-0 top-8 w-40 bg-white border shadow-md rounded">
                                    <button
                                        onClick={() => navigate("/profile")}
                                        className="cursor-pointer block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                    >
                                        My Profile
                                    </button>

                                    <button
                                        onClick={() => navigate("/all-orders")}
                                        className="cursor-pointer block w-full px-4 py-2 hover:bg-gray-100 text-left"
                                    >
                                        Orders
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="cursor-pointer block w-full px-4 py-2 hover:bg-gray-100 text-left text-red-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                    </div>
                    <NavLink className="text-2xl cursor-pointer flex" to="/cart"><FaShoppingCart /><span className="bg-black text-white rounded-full h-5 w-5 text-sm text-center ">{cartCount}</span></NavLink>
                </div>
            </div>
        </Wrapper>
    )
}