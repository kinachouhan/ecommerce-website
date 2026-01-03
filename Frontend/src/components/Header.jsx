import { NavLink } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { TbHexagonLetterKFilled } from "react-icons/tb";
import { Wrapper } from "./Wrapper";

export const Header = ()=>{
     return(
        <Wrapper>
            <div className=" flex justify-between items-center py-8">
            <div className="">
                <h1 className="flex items-center text-3xl font-semibold"><TbHexagonLetterKFilled /> <span>Kina's Store</span></h1>
            </div>
            <div className="flex gap-6 cursor-pointer">
                <NavLink className={({ isActive }) => isActive ? "underline" : ""} to="/">Home</NavLink>
                <NavLink className={({ isActive }) => isActive ? "underline" : ""}  to="/collection">Collection</NavLink>
                <NavLink className={({ isActive }) => isActive ? "underline" : ""} to="/about">About</NavLink>
                <NavLink className={({ isActive }) => isActive ? "underline" : ""}  to="/contact">Contact</NavLink>
            </div>
            <div className="flex gap-4 items-center">
                <div className="border border-gray-400 flex items-center p-1 rounded-sm">
                    <input className="outline-none" placeholder="Search Here..."/>
                    <button>< CiSearch className="text-2xl cursor-pointer" /></button>
                </div>
                <NavLink className="text-2xl cursor-pointer" to="/signup"><CgProfile /></NavLink>
                <NavLink  className="text-2xl cursor-pointer" to="/cart"><FaShoppingCart /></NavLink>
            </div>
        </div>
        </Wrapper>
     )
}