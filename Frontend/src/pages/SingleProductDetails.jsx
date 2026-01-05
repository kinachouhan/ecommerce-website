import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { Wrapper } from "../components/Wrapper";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts } from "../redux/productSlice.js"


export const SingleProductDetails = () => {

    const { products } = useSelector(state => state.product)

    const dispatch = useDispatch()

    useEffect(() => {
        fetchProducts()
    }, [dispatch])


   
    const { id } = useParams();
    const navigate = useNavigate()

    const [product, setProduct] = useState({})
    const [activeTab, setActiveTab] = useState("description");


    const fetchData = async () => {
        const res = await fetch(`http://localhost:3200/api/v1/products/product/${id}`)
        const data = await res.json()
        if (data.success) {
            console.log(data.responseData)
            setProduct(data.responseData)
        }
    }


    useEffect(() => {
        fetchData()
    }, [id])

    
     const relatedProducts = products.filter(
        (prod) =>
            prod.subCategory === product.subCategory
        //  &&
        //     prod._id !== product._id
    );


    if (!product || !product.images || product.images.length === 0) {
        return (
            <Wrapper>
                <p>Loading...</p>
            </Wrapper>
        );
    }


    return (
        <Wrapper>
            <div className="pt-12 flex gap-12">
                <div className="w-1/2 flex gap-12">
                    <div className="w-[200px] flex flex-col gap-8 h-[200px]">
                        {
                            product.images.map((img, index) => {
                                return (
                                    <div key={index}>
                                        <img className="h-[100px]" src={img} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <img className="h-[500px]" src={product.images[0]} />
                    </div>
                </div>

                <div className="w-1/2 flex flex-col  gap-4">
                    <h1 className="text-3xl font-semibold">{product.productName}</h1>
                    <div className="flex gap-2 items-center">
                        <h1 className="flex text-yellow-500 gap-1"><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /> </h1>
                        <h1 className="text-sm">No ratings (0 Reviews)</h1>
                    </div>
                    <h1 className="text-3xl font-semibold">${product.price}</h1>
                    <p className="text-gray-600">{product.description}</p>
                    <h1 className="font-semibold pt-6">Select Sizes:</h1>
                    <div className="flex gap-6">
                        {
                            product.sizes.map((size) => {
                                return (
                                    <button key={size} className="p-2 bg-gray-200 px-4 ">{size}</button>
                                )
                            })
                        }
                    </div>
                    <div>
                        <button className="bg-black text-white p-2 px-4 my-6">Add to Cart</button>
                    </div>
                    <div className=" border-t-1 border-gray-300 ">
                    </div>
                    <div className="text-md font-semibold text-gray-500 flex gap-1 flex-col ">
                        <h1>100% Original product.</h1>
                        <h1>Cash on delivery is available on this product.</h1>
                        <h1>Easy return and exchange policy within 7 days.</h1>
                    </div>
                </div>
            </div>
            <div className="my-20">
                <div className="flex">
                    <button onClick={() => setActiveTab("description")}
                        className={`border border-gray-300 p-4 px-6 cursor-pointer ${activeTab === "description" ? "bg-black text-white" : ""
                            }`}
                    >Description</button>
                    <button onClick={() => setActiveTab("reviews")} className={`border border-gray-300 p-4 px-6 cursor-pointer ${activeTab === "reviews" ? "bg-black text-white" : ""
                        }`}>Reviews(0)</button>
                </div>
                {
                    activeTab === "description"
                    &&
                    (
                        <div className="border border-gray-300 p-8 text-sm text-gray-500 flex gap-4 flex-col ">
                            <p className="">An e-commerce website is a digital platform that enables users to browse, search, and purchase products or services online. It provides a seamless shopping experience by offering features such as product listings, secure payment gateways, user authentication, order management, and customer support—making buying and selling faster, easier, and accessible from anywhere.</p>
                            <p> E-commerce websites typically display products or services along with detailed descriptions, images, pricing, and availability. They allow users to compare items, add products to a shopping cart, and complete purchases through secure and convenient online payment systems.</p>
                        </div>
                    )
                }
                {
                    activeTab === "reviews" &&
                    (
                        <div className="border border-gray-300 p-8 text-sm  flex gap-4 flex-col ">
                            <div className="border-b-1 border-gray-200 py-6" >
                                <h1 className="border border-gray-200 bg-gray-100 p-4">Please <span className="underline font-bold cursor-pointer" onClick={() => navigate("/login")}>login</span> to write a review. Only verified purchasers can submit reviews.</h1>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="font-semibold text-2xl ">Customer Reviews</h1>
                                <p className="text-gray-500">No reviews yet. Be the first to review this product!!</p>
                            </div>

                        </div>
                    )
                }


            </div>
            {
                relatedProducts.length > 0 &&
                <div>
                    <h1 className="text-center font-semibold text-gray-500 text-3xl ">RELATED <span className="text-black my-6">PRODUCTS _____</span></h1>
                    {
                        <div className="grid grid-cols-4 gap-4 py-12 pb-20">
                            {
                                relatedProducts.filter((prod) => prod.subCategory === product.subCategory).map((p) => {
                                    return (
                                        <div key={p._id} className="flex flex-col p-5 bg-gray-100 rounded-sm shadow-xl">
                                            <div onClick={() => navigate(`/product/${p._id}`)} className=" cursor-pointer  flex flex-col gap-2 ">
                                                <img className="h-[200px] " src={p.images[0]} />
                                                <h1>Price: ${p.price}</h1>
                                                <h1 className="font-semibold">{p.productName}</h1>
                                            </div>
                                            <button className="bg-red-500 p-2 px-4 text-white rounded-sm mt-2">Add to Cart</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            }
        </Wrapper>
    )
}