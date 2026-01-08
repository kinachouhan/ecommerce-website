import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAdmin , updateOrderStatusAsync } from "../redux/orderSlice";
import { GrDeliver } from "react-icons/gr";

export const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  if (loading) return <h1>Loading Orders...</h1>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-6 mb-6 rounded flex justify-between"
        >
          {/* Left side: Products + User */}
          <div className="flex gap-5">
            <GrDeliver className="text-7xl text-gray-700 border p-2" />
            <div>
              {order.items.map((item) => (
                <h2 key={`${order._id}-${item.productId}`} className="font-semibold">
                  {item.productName}
                </h2>
              ))}
              <h1 className="text-xl font-bold">
                {order.userData.firstName} {order.userData.lastName}
              </h1>
              <p className="text-sm">
                {order.userData.street}, {order.userData.city},{" "}
                {order.userData.state}
              </p>
              <p>{order.userData.phone}</p>
            </div>
          </div>

          {/* Right side: Amount + Payment + Status */}
          <div className="flex flex-col gap-2 items-end">
            <h2 className="font-bold">${order.total}</h2>
            <h3 className="font-bold text-sm">
              Payment: {order.paymentStatus || order.paymentMethod}
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
              className="border px-4 py-2"
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
  );
};
