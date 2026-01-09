import { Link } from "react-router-dom";
import { Wrapper } from "./Wrapper";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setUser } from "../redux/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../redux/cartSlice.js";

export const Login = () => {

  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogin = async () => {
    if (!userDetails.email || !userDetails.password) {
      toast.error("All fields are required");
      return;
    }

    const res = await fetch(`${API}/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userDetails),
    });

    const data = await res.json();

    if (data.success) {
      dispatch(setUser(data.responseData));

      toast.success("Logged in successfully");

      if (data.responseData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      setUserDetails({ email: "", password: "" });
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <Wrapper>
      <div className="min-h-screen flex justify-center items-center px-4">
        <div className="w-full max-w-md rounded-xl border border-gray-300 p-8 sm:p-12 flex flex-col gap-6 shadow-lg bg-white">
          <h1 className="text-2xl font-semibold tracking-wide text-center">Login ____</h1>

          <div className="flex flex-col gap-4 w-full">
            <input
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              placeholder="Enter Email"
              type="email"
              className="border border-gray-400 p-2 rounded-md outline-none "
            />
            <input
              name="password"
              value={userDetails.password}
              onChange={handleChange}
              onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
              placeholder="Enter Password"
              type="password"
              className="border border-gray-400 p-2 rounded-md outline-none"
            />
          </div>

          <div className="flex justify-between text-sm items-center">
            <p>Doesn't have an account?</p>
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </div>

          <button
            onClick={handleLogin}
            className="bg-black text-white p-2 px-8 rounded-md hover:bg-gray-900 transition"
          >
            Login
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
