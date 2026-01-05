import { Wrapper } from "../components/Wrapper"
import { removeFromCart, addToCart, clearCart, decreaseQty } from "../redux/cartSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { CartTotal } from "../pages/CartTotal.jsx";


export const Cart = () => {


    const { items } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()




    if (items.length === 0) {
        return (
            <Wrapper>
                <h1 className="text-center text-2xl py-50">
                    Your cart is empty 🛒
                </h1>
            </Wrapper>
        );
    }


    return (
        <Wrapper>
            <div className="border-t-1 border-gray-200 py-10 flex flex-col ">
                <div>
                    <h1 className="text-gray-500 font-semibold text-xl">YOUR <span className="text-black">CART ______</span></h1>
                </div>
                <div className="flex flex-col gap-10 pt-12">
                    {
                        items.map((item) => {
                            return (
                                <div key={item._id} className="flex justify-between">
                                    <div className="flex gap-10">
                                        <img className="h-[100px] w-[100px]" src={item.images[0]} />
                                        <div className="flex flex-col gap-2">
                                            <h1 className="font-semibold">{item.productName}</h1>
                                            <h1 className="flex gap-4">${item.price}</h1>
                                            <h1 className=" border px-2">Size: {item.size}</h1>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            className="border px-3"
                                            onClick={() => dispatch(decreaseQty(item._id))}
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            className="border px-3"
                                            onClick={() => dispatch(addToCart(item))}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="text-3xl">
                                        <button className="cursor-pointer" onClick={() => dispatch(removeFromCart(item._id))}><MdDelete /></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex  flex-end justify-end items-end mt-12 border-t pt-6">
                    <div className="flex flex-col gap-2">
                        <CartTotal/>
                        <div className="flex gap-2 py-6">
                            <button onClick={() => dispatch(clearCart())} className="border px-6 py-2 cursor-pointer">Clear Cart</button>
                            <button onClick={() => navigate("/checkout")} className="bg-black text-white px-6 py-2 cursor-pointer">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}