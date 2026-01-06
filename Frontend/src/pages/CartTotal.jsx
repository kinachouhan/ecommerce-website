import { useSelector } from "react-redux";

export const CartTotal = ({ items: propItems }) => {

  
    const cartItems = useSelector(state => state.cart.items);
    const items = propItems ?? cartItems;

    const subTotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const total = subTotal + 10;

    return (
        <>
            <h1 className="text-gray-500 font-semibold text-3xl">
                CART <span className="text-black">TOTALS_____</span>
            </h1>

            <div className="pt-6 flex flex-col">
                <h1 className="flex justify-between border-b-1 border-gray-200 pb-2">
                    Subtotal:<span> ${subTotal}.00</span>
                </h1>

                <h1 className="flex justify-between border-b-1 border-gray-200 py-2">
                    Shipping Fee:<span> $10.00</span>
                </h1>

                <h1 className="flex justify-between font-semibold pt-2">
                    Total:<span> ${total}.00</span>
                </h1>
            </div>
        </>
    );
};
