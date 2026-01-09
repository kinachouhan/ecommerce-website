import { Wrapper } from "../components/Wrapper.jsx"
import { updateAddress } from "../redux/authSlice.js"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"

export const Profile = () => {

    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
   const API = import.meta.env.VITE_API_URL;
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
        const res = await fetch(`${API}/api/v1/users/profile`, {
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
        } else {
            toast.error("Please enter all details")
            return
        }
    };

    return (
        <Wrapper>
            <div className="border-t border-gray-200 py-8">
                <h1 className="py-6 text-gray-600 text-2xl font-semibold">
                    MY <span className="text-black">PROFILE ______</span>
                </h1>

                <p className="text-sm text-gray-600 max-w-3xl">
                    Save your delivery information to speed up future orders.
                    This information will be automatically filled when placing an order.
                </p>

                {/* FORM */}
                <div className="flex flex-col gap-4 py-8 max-w-3xl w-full">
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            value={userData.firstName}
                            onChange={handleInputData}
                            className="border border-gray-300 p-2 px-4 outline-none rounded-sm w-full"
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                        />
                        <input
                            value={userData.lastName}
                            onChange={handleInputData}
                            className="border border-gray-300 p-2 px-4 outline-none rounded-sm w-full"
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                        />
                    </div>

                    <input
                        value={userData.email}
                        onChange={handleInputData}
                        className="border border-gray-300 p-2 px-4 outline-none rounded-sm w-full"
                        type="email"
                        placeholder="Email Address"
                        name="email"
                    />

                    <input
                        value={userData.street}
                        onChange={handleInputData}
                        className="border border-gray-300 p-2 px-4 outline-none rounded-sm w-full"
                        type="text"
                        placeholder="Street"
                        name="street"
                    />

                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            value={userData.city}
                            onChange={handleInputData}
                            className="border border-gray-300 p-2 px-4 outline-none rounded-sm w-full"
                            type="text"
                            placeholder="City"
                            name="city"
                        />
                        <input
                            value={userData.state}
                            onChange={handleInputData}
                            className="border border-gray-300 p-2 px-4 outline-none rounded-sm w-full"
                            type="text"
                            placeholder="State"
                            name="state"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            value={userData.zipcode}
                            onChange={handleInputData}
                            className="border border-gray-300 p-2 px-4 outline-none rounded-sm w-full"
                            type="text"
                            placeholder="Zipcode"
                            name="zipcode"
                        />
                        <input
                            value={userData.country}
                            onChange={handleInputData}
                            className="border border-gray-300 p-2 px-4 outline-none rounded-sm w-full"
                            type="text"
                            placeholder="Country"
                            name="country"
                        />
                    </div>

                    <input
                        value={userData.phone}
                        onChange={handleInputData}
                        className="border border-gray-300 p-2 px-4 outline-none rounded-sm w-full"
                        placeholder="Phone"
                        name="phone"
                    />
                </div>

                <div className="pb-16">
                    <button
                        onClick={saveProfile}
                        className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
                    >
                        Save Profile
                    </button>
                </div>
            </div>
        </Wrapper>
    )
}
