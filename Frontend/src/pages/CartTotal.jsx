import { useSelector } from "react-redux";

export const CartTotal = ({ items: propItems }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const items = propItems ?? cartItems;

  const subTotal = items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const shipping = items.length > 0 ? 10 : 0;
  const total = subTotal + shipping;

  return (
    <>
      <h1 className="text-gray-500 font-semibold text-3xl">
        CART <span className="text-black">TOTALS_____</span>
      </h1>

      <div className="pt-6 flex flex-col">
        <h1 className="flex justify-between border-b pb-2">
          Subtotal:<span> ${subTotal.toFixed(2)}</span>
        </h1>

        <h1 className="flex justify-between border-b py-2">
          Shipping Fee:<span> ${shipping.toFixed(2)}</span>
        </h1>

        <h1 className="flex justify-between font-semibold pt-2">
          Total:<span> ${total.toFixed(2)}</span>
        </h1>
      </div>
    </>
  );
};
