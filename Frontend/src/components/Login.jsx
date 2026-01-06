import { Link } from "react-router-dom"
import { Wrapper } from "./Wrapper"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export const Login = () => {

    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserDetails(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLogin = async () => {
        if (!userDetails.email || !userDetails.password) {
            toast.error("All fields are required")
            return
        }

        const res = await fetch("http://localhost:3200/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(userDetails)
        })

        const data = await res.json()

        if (data.success) {
            navigate("/")
            toast.success("LoggedIn successfully")

            setUserDetails({
                email: "",
                password: ""
            })
        }else{
            toast.error("Invalid Credentails")
        }


    }
    return (
        <Wrapper>
            <div className=" h-screen flex justify-center items-center">
                <div className=" w-1/3 rounded-xl flex flex-col justify-center items-center border-1 border-black p-12 gap-6">
                    <h1 className="tracking-wide font-semibold text-2xl ">Login ____</h1>
                    <div className="w-full">
                        <div className="flex flex-col gap-4 w-[100%]">
                            <input onChange={handleChange} name="email" value={userDetails.email} className="border border-gray-700 p-2 rounded-sm outline-none" placeholder="Enter Email" type="email" />
                            <input onChange={handleChange} name="password" value={userDetails.password} className="border border-gray-700 p-2 rounded-sm outline-none" placeholder="Enter Password" type="password" />
                        </div>
                        <div className="flex justify-between py-1 text-sm">
                            <p>Doesn't have an account?</p>
                            <Link to="/signup" className="text-blue-500 cursor-pointer hover:underline">Signup</Link>
                        </div>

                    </div>
                    <button onClick={handleLogin} className="cursor-pointer bg-black text-white p-2 px-8 rounded-sm">Login</button>
                </div>
            </div>
        </Wrapper>
    )
}