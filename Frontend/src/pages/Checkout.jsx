import { Wrapper } from "../components/Wrapper"
import { CartTotal } from "./CartTotal"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "../redux/cartSlice.js"
import { useEffect } from "react"
import { clearBuyNowItem } from "../redux/buyNow.js"
import { placeOrderAsync } from "../redux/orderSlice.js"


export const Checkout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user);


    const buyNowItem = useSelector(state => state.buyNow.item);
    const cartItems = useSelector(state => state.cart.items);

    const items = buyNowItem ? [buyNowItem] : cartItems;

    const subTotal = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const total = subTotal + 10
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
    })

    const handleInputData = (e) => {
        const { name, value } = e.target

        setUserData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

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


            if (buyNowItem) {
                dispatch(clearBuyNowItem());
            } else {
                dispatch(clearCart());
            }

            navigate("/success-order", {
                state: { orderId: result._id }
            });

        } catch (error) {
            toast.error(error.message || "Order failed");
        }
    };



    return (
        <Wrapper>
            <div className="border-t-1 border-gray-200 py-6 pb-60 flex gap-12">
                <div className="w-1/2">
                    <h1 className="text-2xl font-semibold text-gray-500 py-8">DELIVERY <span className="text-black">INFORMATION ______</span></h1>
                    <div className="flex gap-6 flex-col">
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
                            <input value={userData.country} onChange={(e) => handleInputData(e)} className="w-full border border-gray-300 p-1 px-4 outline-none rounded-sm" type="text" placeholder="Country" name="country" />
                        </div>
                        <input value={userData.phone} onChange={(e) => handleInputData(e)} className="border border-gray-300 p-1 px-4 outline-none rounded-sm" placeholder="Phone" name="phone" />
                    </div>
                </div>
                <div className="w-1/2 pl-12 flex pt-20 items-end flex-col">
                    <div>
                        <CartTotal items={items} />
                    </div>
                    <div className="py-8">
                        <h1 className="text-2xl text-gray-500 font-semibold pb-6">PAYMENT <span className="text-black">METHOD _____</span></h1>
                        <div className="flex gap-5 items-center">
                            <label className="border border-gray-200 p-2">
                                <input onChange={(e) => handleInputData(e)}
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={userData.payment === "online"}
                                />
                                Bank Account
                            </label>
                            <label className="border border-gray-200 p-2">
                                <input onChange={(e) => handleInputData(e)}
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={userData.payment === "cod"}

                                />
                                Cash on delivery
                            </label>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => handleOrder()} className="cursor-pointer bg-black text-white p-2 px-4">Place Order</button>
                    </div>

                </div>
            </div>
        </Wrapper>
    )
}