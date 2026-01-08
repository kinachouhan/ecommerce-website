import { Wrapper } from "../components/Wrapper";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../redux/orderSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AllOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orders = useSelector((state) => state.order.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (!orders || orders.length === 0) {
        return (
            <Wrapper>
                <h1 className="text-2xl text-gray-600 py-60 text-center">
                    No orders found
                </h1>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h1 className="text-3xl font-semibold text-gray-600 mb-6 pt-10">
                MY <span className="text-black">ORDERS _______</span>
            </h1>

            {orders.map((order) => (
                <div
                    key={order._id}
                    className="border border-gray-300 p-4 sm:p-6 mb-6 rounded-md"
                >
                    {/* ORDER INFO */}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
                        <div>
                            <p className="font-semibold break-all">
                                Order ID: {order._id}
                            </p>
                            <p>
                                Status:
                                <span
                                    className={`ml-2 font-semibold ${order.status === "Order Placed"
                                            ? "text-orange-500"
                                            : order.status === "Delivered"
                                                ? "text-green-700"
                                                : order.status === "Cancelled"
                                                    ? "text-red-600"
                                                    : order.status === "Pending"
                                                        ? "text-pink-600"
                                                        : order.status === "Packing"
                                                            ? "text-blue-600"
                                                            : "text-gray-600"
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </p>
                        </div>

                        <div className="sm:text-right">
                            <p className="font-semibold">
                                Total: ${order.total}
                            </p>
                            <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* ORDER ITEMS */}
                    <div className="flex flex-col gap-4">
                        {order.items.map((item) => (
                            <div
                                key={`${order._id}-${item.productId}-${item.size}`}
                                className="flex flex-col sm:flex-row gap-4 sm:gap-6 border p-3 sm:p-4 rounded"
                            >
                                <img
                                    src={item.images?.[0]}
                                    alt={item.productName}
                                    className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded"
                                />

                                <div className="flex flex-col gap-1">
                                    <h2 className="font-semibold text-lg">
                                        {item.productName}
                                    </h2>
                                    <p className="text-gray-600">
                                        Price: ${item.price}
                                    </p>
                                    <p className="text-gray-600">
                                        Quantity: {item.quantity}
                                    </p>
                                    <p className="text-gray-600">
                                        Size: {item.size}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* TRACK BUTTON */}
                    <button
                        onClick={() => navigate(`/track-order/${order._id}`)}
                        className="mt-4 w-full sm:w-auto bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
                    >
                        Track Order
                    </button>
                </div>
            ))}
        </Wrapper>
    );
};
