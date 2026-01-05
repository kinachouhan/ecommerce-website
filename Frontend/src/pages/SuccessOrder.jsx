import { Wrapper } from "../components/Wrapper"
import { useSelector } from "react-redux"
import { useNavigate , useLocation} from "react-router-dom"

export const SuccessOrder = () => {

    const navigate = useNavigate()

    const items = useSelector(state => state.cart.items)
    const userData = useSelector(state => state.order.userData)

    const subTotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )
    const total = subTotal + 10

    const { state } = useLocation()
    const orders = useSelector(state => state.order.orders)

    const order = orders.find(o => o.id === state?.orderId)

    if (!order) return <h1>Order not found</h1>


    return (
        <Wrapper>
            <div className="py-12 border-t-1 border-gray-200">
                <div className="flex justify-center items-center flex-col gap-4 py-10">
                    <h1 className="text-5xl font-bold">Thanks for shopping with Kina's Store!!</h1>
                    <p className="text-lg text-gray-500 font-semibold">Your order has been placed successfully</p>
                </div>
                <div className="py-12 flex flex-col ">
                    <div className="pb-12">
                        <h1 className="font-semibold text-2xl text-gray-500">ORDER <span className="text-black">DETAILS_____</span></h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        {
                            order.items.map((item) => {
                                return (
                                    <div className="flex justify-between border border-gray-200 p-6 rounded-sm">
                                        <div className="flex gap-6">
                                            <img className="h-[150px] w-[150px]" src={item.images[0]} />
                                            <div className="flex flex-col gap-4">
                                                <h1 className="text-xl font-semibold">{item.productName}</h1>
                                                <div className="flex gap-4 text-md text-gray-600">
                                                    <h1>Price: ${item.price}</h1>
                                                    <h1>Quantity: {item.quantity}</h1>
                                                    <h1>Size: {item.size}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className="font-bold ">${item.price * item.quantity}.00</h1>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="border-y-1 border-gray-200 flex justify-between py-5 mt-12">
                        <h1>SubTotal:</h1>
                        <h1>${total}.00</h1>
                    </div>
                    <div className="flex justify-between py-5 font-bold text-xl">
                        <h1>Total Amount:</h1>
                        <h1>${total}.00</h1>
                    </div>
                    <div className="py-6 flex items-end flex-col ">
                        <h1 className="text-lg font-semibold py-4">Delivery Address</h1>
                        <div className="text-sm text-gray-600 flex flex-col gap-2">
                            <h1>{order.userData.firstName} <span>{order.userData.lastName}</span></h1>
                            <h1>{order.userData.street}</h1>
                            <h1>{order.userData.city}, <span>{order.userData.state}</span> {order.userData.zipcode}</h1>
                            <h1>{order.userData.country}</h1>
                            <h1>Phone: {order.userData.phone}</h1>
                            <h1>Email: {order.userData.email}</h1>
                            <button onClick={() => navigate("/all-orders")} className="cursor-pointer bg-black text-white p-2 px-8 mt-8 text-xl">View All Orders</button>
                        </div>
                    </div>

                </div>
            </div>
        </Wrapper>
    )
}