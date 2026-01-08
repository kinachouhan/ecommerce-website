import { Wrapper } from "../components/Wrapper";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export const SuccessOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orders = useSelector((store) => store.order.orders);
  const order = orders.find((o) => o._id === location.state?.orderId);

  if (!order) return <h1 className="text-center py-20">Order not found</h1>;

  return (
    <Wrapper>
      <div className="py-12 border-t border-gray-200">
        {/* Thank You Section */}
        <div className="flex flex-col justify-center items-center gap-4 py-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Thanks for shopping with <span className="text-black">Kina's Store!</span>
          </h1>
          <p className="text-lg text-gray-500 font-semibold">
            Your order has been placed successfully
          </p>
        </div>

        {/* Order Details */}
        <div className="py-8">
          <h1 className="font-semibold text-2xl text-gray-500 pb-6">
            ORDER <span className="text-black">DETAILS _____</span>
          </h1>

          <div className="flex flex-col gap-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between border border-gray-200 p-4 md:p-6 rounded-md gap-4 md:gap-0"
              >
                <div className="flex gap-4 md:gap-6 items-center">
                  <img
                    className="h-28 w-28 md:h-36 md:w-36 object-cover rounded"
                    src={item.images[0]}
                    alt={item.productName}
                  />
                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg md:text-xl font-semibold">{item.productName}</h1>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-gray-600 text-sm md:text-md">
                      <span>Price: ${item.price}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Size: {item.size}</span>
                    </div>
                  </div>
                </div>
                <div className="self-end md:self-center text-lg md:text-xl font-bold">
                  ${item.price * item.quantity}.00
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-8 border-t border-b border-gray-200 py-4 flex flex-col md:flex-row justify-between text-gray-700 text-lg font-medium gap-2">
            <span>SubTotal:</span>
            <span>${order.total}.00</span>
          </div>
          <div className="flex justify-between font-bold text-xl mt-4">
            <span>Total Amount:</span>
            <span>${order.total}.00</span>
          </div>

          {/* Delivery Address */}
          <div className="mt-8 flex flex-col md:flex-row justify-between gap-6 md:gap-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold pb-2">Delivery Address</h1>
              <p className="text-gray-600">{order.userData.firstName} {order.userData.lastName}</p>
              <p className="text-gray-600">{order.userData.street}</p>
              <p className="text-gray-600">{order.userData.city}, {order.userData.state} {order.userData.zipcode}</p>
              <p className="text-gray-600">{order.userData.country}</p>
              <p className="text-gray-600">Phone: {order.userData.phone}</p>
              <p className="text-gray-600">Email: {order.userData.email}</p>
            </div>

            <div className="flex items-start md:items-end">
              <button
                onClick={() => navigate("/all-orders")}
                className="cursor-pointer bg-black text-white px-6 py-3 text-lg rounded hover:bg-gray-900 transition"
              >
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
