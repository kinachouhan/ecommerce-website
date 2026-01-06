import { Wrapper } from "../components/Wrapper.jsx"
import { updateAddress } from "../redux/authSlice.js"
import { useState , useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"



export const Profile = () => {

    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const handleInputData = (e) => {
        const { name, value } = e.target

        setUserData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        if (user?.address) {
            setUserData(user.address);
        }
    }, [user]);


    const saveProfile = async () => {
        const res = await fetch("http://localhost:3200/api/v1/users/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ address: userData })
        });

        const data = await res.json();

        if (data.success) {
            dispatch(updateAddress(data.responseData.address));
            toast.success("Profile updated");
            console.log(data.responseData.address)
        }
        else {
            toast.error("Please enter all details")
            return
        }

    };




    return (
        <Wrapper>
            <div className="border-t-1 border-gray-200 py-6">
                <h1 className="py-10 text-gray-600 text-2xl font-semibold">MY <span className="text-black">PROFILE ______</span></h1>
                <p>Save Your delivery information to speed up future orders. This information will be automatically filled, when placing an order. </p>
                <div className="flex gap-6 flex-col py-10 w-1/2">
                    <div className="flex gap-2">
                        <input value={userData.firstName} onChange={(e) => handleInputData(e)} className="border border-gray-300 p-1 px-4 outline-none rounded-sm w-full" type="text" placeholder="First Name" name="firstName" />
                        <input value={userData.lastName} onChange={(e) => handleInputData(e)} className="border border-gray-300 p-1 px-4 outline-none rounded-sm w-full" type="text" placeholder="Last Name" name="lastName" />
                    </div>
                    <input value={userData.email} onChange={(e) => handleInputData(e)} className="border border-gray-300 p-1 px-4 outline-none rounded-sm" type="email" placeholder="Email Address" name="email" />
                    <input value={userData.street} onChange={(e) => handleInputData(e)} className="border border-gray-300 p-1 px-4 outline-none rounded-sm" type="text" placeholder="Street" name="street" />
                    <div className="flex gap-2">
                        <input value={userData.city} onChange={(e) => handleInputData(e)} className="w-full border border-gray-300 p-1 px-4 outline-none rounded-sm" type="text" placeholder="City" name="city" />
                        <input value={userData.state} onChange={(e) => handleInputData(e)} className="w-full border border-gray-300 p-1 px-4 outline-none rounded-sm" type="text" placeholder="State" name="state" />
                    </div>
                    <div className="flex gap-2">
                        <input value={userData.zipcode} onChange={(e) => handleInputData(e)} className="w-full border border-gray-300 p-1 px-4 outline-none rounded-sm" type="text" placeholder="Zipcode" name="zipcode" />
                        <input  value={userData.country} onChange={(e) => handleInputData(e)} className="w-full border border-gray-300 p-1 px-4 outline-none rounded-sm" type="text" placeholder="Country" name="country" />
                    </div>
                    <input value={userData.phone} onChange={(e) => handleInputData(e)} className="border border-gray-300 p-1 px-4 outline-none rounded-sm" placeholder="Phone" name="phone" />
                </div>
                <div className="pb-20">
                    <button onClick={saveProfile} className="cursor-pointer bg-black p-2 px-6 text-white">Save Profile</button>
                </div>
            </div>
        </Wrapper>
    )
}