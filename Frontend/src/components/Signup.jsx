import { Link } from "react-router-dom"
import { Wrapper } from "./Wrapper"

export const Signup = () => {
    return (
       <Wrapper>
         <div className=" h-screen flex justify-center items-center">
            <div className=" w-1/2 rounded-xl flex flex-col justify-center items-center border-1 border-black p-12 gap-6">
                <h1 className="tracking-wide font-semibold text-2xl ">Sign Up ____</h1>
                <div className="w-full">
                    <div className="flex flex-col gap-4 w-[100%]">
                        <input className="border border-gray-700 p-2 rounded-sm outline-none" placeholder="Enter Name" type="text" />
                        <input className="border border-gray-700 p-2 rounded-sm outline-none" placeholder="Enter Email" type="email" />
                        <input className="border border-gray-700 p-2 rounded-sm outline-none"  placeholder="Enter Password" type="password" />
                    </div>
                    <div className="flex justify-between py-1 text-sm">
                        <p>Alreday have an account</p>
                        <Link to="/login" className="text-blue-500 cursor-pointer hover:underline">Login</Link>
                    </div>
                
                </div>
                <button className="bg-black text-white p-2 px-8 rounded-sm">Sign Up</button>
            </div>
        </div>
       </Wrapper>
    )
}