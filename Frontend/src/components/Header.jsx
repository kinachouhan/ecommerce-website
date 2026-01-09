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
import { logout } from "../redux/authSlice.js"

export const Header = () => {

    const API = import.meta.env.VITE_API_URL;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("");
    const location = useLocation();
    const cartCount = useSelector(state =>
        state.cart.items.reduce((total, item) => total + item.quantity, 0)
    );

    const [open, setOpen] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)

    const { isAuthenticated } = useSelector(state => state.auth)

    const handleLogout = async () => {
        try {
            await fetch(`${API}/api/v1/users/logout`, {
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
            {/* Header Container */}
            <div className="flex items-center justify-between py-3 px-2 md:py-5 px-4 md:px-0 border-b border-gray-200">

                {/* Logo */}
                <div className="flex items-center text-2xl md:text-3xl font-semibold gap-2 flex-shrink-0">
                    <TbHexagonLetterKFilled />
                    <span>Kina's Store</span>
                </div>

                {/* Navigation (Desktop) */}
                <div className="hidden md:flex gap-6 font-medium">
                    <NavLink className={({ isActive }) => isActive ? "underline" : ""} to="/">Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "underline" : ""} to="/collection">Collection</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "underline" : ""} to="/about">About</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "underline" : ""} to="/contact">Contact</NavLink>
                </div>

                {/* Search + Icons */}
                <div className="flex items-center gap-4 md:gap-6 flex-1 md:flex-none justify-end">

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex flex-1 max-w-md border border-gray-300 rounded overflow-hidden">
                        <input
                            value={searchText}
                            onChange={handleSearch}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSearchBtn(); }}
                            placeholder="Search Here..."
                            className="flex-1 px-3 py-2 text-sm md:text-base outline-none"
                        />
                        <button
                            onClick={handleSearchBtn}
                            className="px-3 border-l border-gray-300"
                        >
                            <CiSearch className="text-xl md:text-2xl" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="md:hidden text-2xl focus:outline-none"
                    >
                        &#9776;
                    </button>

                    {/* Profile Dropdown */}
                    <div
                    onMouseLeave={() => setOpen(false)}
                     className="relative flex items-center">
                            <button
                                onClick={() => { if (!isAuthenticated) navigate("/login") }}
                                onMouseEnter={() => isAuthenticated && setOpen(true)}
                               
                                className="p-2 text-2xl md:text-3xl flex items-center justify-center"
                            >
                                <CgProfile />
                            </button>

                        {isAuthenticated && open && (
                            <div className="absolute right-0 top-9 w-36 md:w-40 bg-white border shadow-md rounded z-50">
                                <button onClick={() => navigate("/profile")} className="block w-full px-4 py-2 hover:bg-gray-100 text-left">My Profile</button>
                                <button onClick={() => navigate("/all-orders")} className="block w-full px-4 py-2 hover:bg-gray-100 text-left">Orders</button>
                                <button onClick={handleLogout} className="block w-full px-4 py-2 hover:bg-gray-100 text-left text-red-600">Logout</button>
                            </div>
                        )}
                    </div>

                    {/* Cart */}
                    <NavLink className="relative text-2xl md:text-3xl flex items-center justify-center" to="/cart">
                        <FaShoppingCart />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </NavLink>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
                <div className="md:hidden flex flex-col gap-3 px-4 py-3 border-b border-gray-200">
                    {/* Mobile Search */}
                    <div className="flex w-full mb-2">
                        <input
                            value={searchText}
                            onChange={handleSearch}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSearchBtn(); }}
                            placeholder="Search Here..."
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l outline-none"
                        />
                        <button
                            onClick={handleSearchBtn}
                            className="px-3 border border-gray-300 border-l-0 rounded-r"
                        >
                            <CiSearch className="text-xl" />
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <NavLink className="block py-2" to="/">Home</NavLink>
                    <NavLink className="block py-2" to="/collection">Collection</NavLink>
                    <NavLink className="block py-2" to="/about">About</NavLink>
                    <NavLink className="block py-2" to="/contact">Contact</NavLink>
                </div>
            )}
        </Wrapper>
    )
}
