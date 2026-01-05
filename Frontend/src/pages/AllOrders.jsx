import { Wrapper } from "../components/Wrapper"
import { useSelector } from "react-redux"


export const AllOrders = () => {

    const orders = useSelector(state => state.order.orders)

    const items = useSelector(state => state.cart.items)

    const subTotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )
    const total = subTotal + 10

    if (!orders.length) {
        return (
            <Wrapper>
                <h1 className="text-2xl text-gray-600 py-60 text-center">No orders found</h1>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <h1 className="text-3xl font-semibold text-gray-600 mb-6 pt-12">MY <span className="text-black">ORDERS _______</span></h1>

            {orders.map(order => (
                <div key={order.id} className="border border-gray-300 p-6 mb-8 rounded">

                    {/* Order Info */}
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-semibold">Order ID: {order.id}</p>
                            <p>
                                Status:
                                <span className={`ml-2 font-semibold ${order.status === "Pending" ? "text-orange-500" :
                                    order.status === "Shipped" ? "text-blue-500" :
                                        "text-green-600"
                                    }`}>
                                    {order.status}
                                </span>
                            </p>
                        </div>
                       
                    </div>

                    {/* Product List */}
                    <div className="flex flex-col gap-4">
                        {order.items.map(item => (
                            <div
                                key={`${order.id}-${item.productId}`}
                                className="flex gap-6 border p-4 rounded"
                            >
                                <img
                                    src={item.images[0]}
                                    alt={item.productName}
                                    className="w-24 h-24 object-cover"
                                />

                                <div className="flex flex-col gap-1">
                                    <h2 className="font-semibold text-lg">
                                        {item.productName}
                                    </h2>
                                    <p className="text-gray-600">Price: ${item.price}</p>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    <p className="text-gray-600">Size: {item.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Track Button */}
                    <button
                        onClick={() => navigate(`/track-order/${order.id}`)}
                        className="mt-4 bg-black text-white px-6 py-2"
                    >
                        Track Order
                    </button>

                </div>
            ))}
        </Wrapper>
    )
}