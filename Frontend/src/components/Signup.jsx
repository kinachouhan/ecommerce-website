import { Link } from "react-router-dom";
import { Wrapper } from "./Wrapper";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.password) {
      toast.error("All fields are required");
      return;
    }

    const res = await fetch(`${API}/api/v1/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentails: "include",
      body: JSON.stringify(userDetails),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Account created!!");
      if (data.responseData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      setUserDetails({ name: "", email: "", password: "" });
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Wrapper>
      <div className="min-h-screen flex justify-center items-center px-4">
        <div className="w-full max-w-md rounded-xl border border-gray-300 p-8 sm:p-12 flex flex-col gap-6 shadow-lg bg-white">
          <h1 className="text-2xl font-semibold tracking-wide text-center">Sign Up ____</h1>

          <div className="flex flex-col gap-4 w-full">
            <input
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              placeholder="Enter Name"
              type="text"
              className="border border-gray-300 p-2 rounded-md outline-none"
            />
            <input
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              placeholder="Enter Email"
              type="email"
              className="border border-gray-300 p-2 rounded-md outline-none"
            />
            <input
              name="password"
              value={userDetails.password}
              onChange={handleChange}
              onKeyDown={(e) => { if (e.key === "Enter") handleSignup(); }}
              placeholder="Enter Password"
              type="password"
              className="border border-gray-300 p-2 rounded-md outline-none"
            />
          </div>

          <div className="flex justify-between text-sm items-center">
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>

          <button
            onClick={handleSignup}
            className="bg-black text-white p-2 px-8 rounded-md hover:bg-gray-900 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
