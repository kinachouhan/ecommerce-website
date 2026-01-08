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
    <div className="bg-white border border-gray-200 rounded-md p-6 w-full shadow-sm">
      <h1 className="text-lg font-semibold text-gray-700 mb-4">
        CART <span className="text-black">TOTALS</span>
      </h1>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span>${subTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping Fee:</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-semibold text-gray-800 text-lg border-t border-gray-200 pt-3">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
