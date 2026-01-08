import { Wrapper } from "../components/Wrapper";
import { removeFromCart, addToCart, clearCart } from "../redux/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CartTotal } from "../pages/CartTotal.jsx";

export const Cart = () => {

    const { items } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("CART ITEMS 👉", items);

    if (items.length === 0) {
        return (
            <Wrapper>
                <h1 className="text-center text-2xl py-40">
                    Your cart is empty 🛒
                </h1>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div className="border-t border-gray-200 py-8 flex flex-col">
                <h1 className="text-gray-500 font-semibold text-xl mb-8">
                    YOUR <span className="text-black">CART ______</span>
                </h1>

                {/* CART ITEMS */}
                <div className="flex flex-col gap-6">
                    {items.map((item) => (
                        <div
                            key={`${item.product._id}-${item.size}`}
                            className="flex flex-col sm:flex-row sm:justify-between gap-4 border border-gray-300 p-4 rounded"
                        >
                            {/* LEFT */}
                            <div className="flex gap-4">
                                <img
                                    className="h-24 w-24 object-cover rounded"
                                    src={item.product.images[0]}
                                />

                                <div className="flex flex-col gap-2">
                                    <h1 className="font-semibold">
                                        {item.product.productName}
                                    </h1>
                                    <h1>${item.product.price}</h1>
                                    <h1 className="border px-2 w-fit">
                                        Size: {item.size}
                                    </h1>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className="flex justify-between sm:justify-end items-center gap-6">
                                {/* QUANTITY */}
                                <div className="flex items-center gap-3">
                                    <button
                                        className="border px-3 py-1"
                                        onClick={() =>
                                            dispatch(addToCart({
                                                productId: item.product._id,
                                                size: item.size,
                                                quantity: -1,
                                            }))
                                        }
                                    >
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        className="border px-3 py-1"
                                        onClick={() =>
                                            dispatch(addToCart({
                                                productId: item.product._id,
                                                size: item.size,
                                                quantity: 1,
                                            }))
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                {/* DELETE */}
                                <button
                                    className="text-2xl text-red-600"
                                    onClick={() =>
                                        dispatch(removeFromCart({
                                            productId: item.product._id,
                                            size: item.size,
                                        }))
                                    }
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CART SUMMARY */}
                <div className="flex justify-end mt-10 border-t border-gray-400 pt-6">
                    <div className="w-full sm:w-auto flex flex-col gap-4">
                        <CartTotal />

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="border px-6 py-2 w-full sm:w-auto"
                            >
                                Clear Cart
                            </button>

                            <button
                                onClick={() => navigate("/checkout")}
                                className="bg-black text-white px-6 py-2 w-full sm:w-auto"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};
