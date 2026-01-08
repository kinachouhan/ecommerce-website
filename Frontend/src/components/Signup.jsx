import { Link } from "react-router-dom"
import { Wrapper } from "./Wrapper"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const Signup = () => {

    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",

    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserDetails(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSignup = async () => {
        if (!userDetails.name || !userDetails.email || !userDetails.password) {
            toast.error("All fields are required")
            return
        }

        const res = await fetch("http://localhost:3200/api/v1/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentails: "include",
            body: JSON.stringify(userDetails)
        })

        const data = await res.json() 

        

        if(data.success){
            if (data.responseData.role === "admin") {
                navigate("/admin")
                toast.success("Account created!!")
            } else {
                navigate("/")
                toast.success("Account created!!")
            }

            setUserDetails({
                name: "",
                email: "",
                password: ""
            })
        }else{
            toast.error("Something went wrong")
        }
    }


    return (
        <Wrapper>
            <div className=" h-screen flex justify-center items-center">
                <div className=" w-1/2 rounded-xl flex flex-col justify-center items-center border-1 border-black p-12 gap-6">
                    <h1 className="tracking-wide font-semibold text-2xl ">Sign Up ____</h1>
                    <div className="w-full">
                        <div className="flex flex-col gap-4 w-[100%]">
                            <input onChange={handleChange} name="name" value={userDetails.name} className="border border-gray-700 p-2 rounded-sm outline-none" placeholder="Enter Name" type="text" />
                            <input onChange={handleChange} name="email" value={userDetails.email} className="border border-gray-700 p-2 rounded-sm outline-none" placeholder="Enter Email" type="email" />
                            <input 
                             onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSignup();
                                    }
                                }}
                            onChange={handleChange} name="password" value={userDetails.password} className="border border-gray-700 p-2 rounded-sm outline-none" placeholder="Enter Password" type="password" />

                        </div>
                        <div className="flex justify-between py-1 text-sm">
                            <p>Alreday have an account</p>
                            <Link to="/login" className="text-blue-500 cursor-pointer hover:underline">Login</Link>
                        </div>

                    </div>
                    <button onClick={handleSignup} className="bg-black text-white p-2 px-8 rounded-sm">Sign Up</button>
                </div>
            </div>
        </Wrapper>
    )
}