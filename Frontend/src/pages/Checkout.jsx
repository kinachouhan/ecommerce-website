import { Wrapper } from "../components/Wrapper";
import { CartTotal } from "./CartTotal";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice.js";
import { clearBuyNowItem } from "../redux/buyNow.js";
import { placeOrderAsync } from "../redux/orderSlice.js";

export const Checkout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const buyNowItem = useSelector(state => state.buyNow.item);
    const cartItems = useSelector(state => state.cart.items);

    const items = buyNowItem ? [buyNowItem] : cartItems;

    const subTotal = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const total = subTotal + 10;

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
        payment: "",
    });

    const handleInputData = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (user?.address) {
            setUserData(prev => ({
                ...prev,
                ...user.address
            }));
        }
    }, [user]);

    const handleOrder = async () => {
        if (
            !userData.firstName ||
            !userData.lastName ||
            !userData.email ||
            !userData.street ||
            !userData.city ||
            !userData.state ||
            !userData.zipcode ||
            !userData.country ||
            !userData.phone ||
            !userData.payment
        ) {
            toast.error("Please fill all delivery details");
            return;
        }

        if (items.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        const newOrder = {
            userId: user._id,
            items: items.map(item => ({
                productId: item.product._id,
                productName: item.product.productName,
                price: item.product.price,
                quantity: item.quantity,
                size: item.size,
                images: item.product.images
            })),
            total,
            paymentMethod: userData.payment === "cod" ? "COD" : "Online",
            userData
        };

        try {
            const result = await dispatch(placeOrderAsync(newOrder)).unwrap();

            if (buyNowItem) dispatch(clearBuyNowItem());
            else dispatch(clearCart());

            navigate("/success-order", {
                state: { orderId: result._id }
            });

        } catch (error) {
            toast.error(error.message || "Order failed");
        }
    };

    return (
    <Wrapper>
        <div className="border-t border-gray-200 py-8 sm:pb-40 sm:pt-20">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* ================= LEFT : DELIVERY INFO ================= */}
                <div className="bg-white border border-gray-200 rounded-md p-6">
                    <h1 className="text-xl font-semibold text-gray-700 mb-6">
                        DELIVERY <span className="text-black">INFORMATION</span>
                    </h1>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                className="border border-gray-300 p-2 w-full rounded outline-none"
                                placeholder="First Name"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleInputData}
                            />
                            <input
                                className="border border-gray-300 p-2 w-full rounded outline-none"
                                placeholder="Last Name"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleInputData}
                            />
                        </div>

                        <input
                            className="border border-gray-300 p-2 rounded outline-none"
                            placeholder="Email Address"
                            name="email"
                            value={userData.email}
                            onChange={handleInputData}
                        />

                        <input
                            className="border border-gray-300 p-2 rounded outline-none"
                            placeholder="Street"
                            name="street"
                            value={userData.street}
                            onChange={handleInputData}
                        />

                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                className="border border-gray-300 p-2 w-full rounded outline-none"
                                placeholder="City"
                                name="city"
                                value={userData.city}
                                onChange={handleInputData}
                            />
                            <input
                                className="border border-gray-300 p-2 w-full rounded outline-none"
                                placeholder="State"
                                name="state"
                                value={userData.state}
                                onChange={handleInputData}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                className="border border-gray-300 p-2 w-full rounded outline-none"
                                placeholder="Zipcode"
                                name="zipcode"
                                value={userData.zipcode}
                                onChange={handleInputData}
                            />
                            <input
                                className="border border-gray-300 p-2 w-full rounded outline-none"
                                placeholder="Country"
                                name="country"
                                value={userData.country}
                                onChange={handleInputData}
                            />
                        </div>

                        <input
                            className="border border-gray-300 p-2 rounded outline-none"
                            placeholder="Phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputData}
                        />
                    </div>
                </div>

                {/* ================= RIGHT : ORDER SUMMARY ================= */}
                <div className="flex flex-col gap-6 lg:sticky lg:top-20 h-fit">

                    {/* CART TOTAL */}
                    <div>
                        <CartTotal items={items} />
                    </div>

                    {/* PAYMENT METHOD */}
                    <div className="bg-white border border-gray-200 rounded-md p-6">
                        <h1 className="text-lg font-semibold text-gray-700 mb-4">
                            PAYMENT METHOD
                        </h1>

                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-3 border-gray-300 border p-3 rounded cursor-pointer hover:border-black">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={userData.payment === "online"}
                                    onChange={handleInputData}
                                />
                                <span className="font-medium">Online Payment</span>
                            </label>

                            <label className="flex items-center gap-3 border border-gray-300 p-3 rounded cursor-pointer hover:border-black">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={userData.payment === "cod"}
                                    onChange={handleInputData}
                                />
                                <span className="font-medium">Cash on Delivery</span>
                            </label>
                        </div>
                    </div>

                    {/* PLACE ORDER */}
                    <button
                        onClick={handleOrder}
                        className="w-full bg-black text-white py-3 rounded-md text-lg hover:opacity-90"
                    >
                        Place Order
                    </button>

                </div>
            </div>
        </div>
    </Wrapper>
);

};
