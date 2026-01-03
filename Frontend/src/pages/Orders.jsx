import { GrDeliver } from "react-icons/gr";
export const Orders = () => {
    return (
        <div>
            <div className="text-2xl font-bold p-4">
                <h1>Orders</h1>
            </div>
            <div className="p-8 border border-gray-300 w-[60%] flex justify-between">

                <div className="w-[60%] flex gap-5">
                    <div >
                        <GrDeliver className=" text-7xl text-gray-700 border border-gray-300 p-2" />
                    </div>

                    <div>
                        <h1 className="font-semibold pb-3">Women Round Neck cotton tshirt</h1>
                        <h1 className="text-xl font-bold">Kina Chouhan</h1>
                        <h2 className="text-sm">Raipur Paratha Gali, Sector 126 ,Noida , Uttar Pradesh , India </h2>
                        <p>975599999</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <h1 className="font-semibold">Items: 1</h1>
                    <h2 className="font-bold">$40</h2>
                    <h3 className="font-bold text-sm">Method: <span className="font-normal">COD</span></h3>
                    <h2 className="font-bold text-sm">Payment: <span className="font-normal">Pending</span></h2>
                
                        <select className="border border-gray-300 px-6 py-2 outline-none">
                            <option>Order Placed</option>
                            <option>Packing</option>
                            <option>Shipped</option>
                            <option>Out for delivery</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                        </select>
                  
                </div>

            </div>
        </div>
    )
}