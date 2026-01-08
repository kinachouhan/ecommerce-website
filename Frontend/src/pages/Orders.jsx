import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAdmin, updateOrderStatusAsync } from "../redux/orderSlice";
import { GrDeliver } from "react-icons/gr";

export const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  if (loading) return <h1>Loading Orders...</h1>;

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {orders.length === 0 && <p className="text-center text-gray-500">No orders found</p>}

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 hover:shadow-md transition-shadow"
          >
            {/* Left: Products + User */}
            <div className="flex gap-4 md:gap-6 items-start md:items-center w-full md:w-2/3">
              <GrDeliver className="text-5xl sm:text-6xl text-gray-700 border p-2 rounded" />
              <div className="flex flex-col gap-1">
                {order.items.map((item) => (
                  <h2 key={`${order._id}-${item.productId}`} className="font-semibold text-gray-800">
                    {item.productName}
                  </h2>
                ))}
                <h3 className="font-bold text-lg text-gray-900">
                  {order.userData.firstName} {order.userData.lastName}
                </h3>
                <p className="text-sm text-gray-600">
                  {order.userData.street}, {order.userData.city}, {order.userData.state}
                </p>
                <p className="text-sm text-gray-600">{order.userData.phone}</p>
              </div>
            </div>

            {/* Right: Amount + Payment + Status */}
            <div className="flex flex-col gap-2 items-start md:items-end w-full md:w-auto">
              <h2 className="font-bold text-lg text-gray-900">${order.total}</h2>
              <h3 className="font-semibold text-sm">
                Payment:{" "}
                <span
                  className={
                    order.paymentStatus === "Completed"
                      ? "text-green-600"
                      : "text-orange-500"
                  }
                >
                  {order.paymentStatus}
                </span>
              </h3>
              <h3 className="font-semibold text-sm text-gray-800">
                Payment Mode: {order.paymentMethod}
              </h3>

              <select
                value={order.status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  if (newStatus !== order.status) {
                    dispatch(
                      updateOrderStatusAsync({
                        orderId: order._id,
                        status: newStatus,
                      })
                    );
                  }
                }}
                className="
    border border-gray-300 
    px-3 py-2 
    rounded 
    focus:outline-none focus:ring-2 focus:ring-gray-300
    w-full sm:w-48
    text-sm
  "
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Pending">Pending</option>
                <option value="Packing">Packing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
