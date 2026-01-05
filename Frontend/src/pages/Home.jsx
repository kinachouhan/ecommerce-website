import { Wrapper } from "../components/Wrapper"
import { RiExchangeFundsFill } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
import { Subscribe } from "../components/Subscribe";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchProducts } from "../redux/productSlice.js"
import {useNavigate} from "react-router-dom"

export const Home = () => {

    const { products, loading } = useSelector(state => state.product)
   
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <Wrapper>
            <div>
                <div className="w-full flex my-12 border border-black/20">
                    <div className="w-1/2 flex flex-col items-center justify-center gap-4">
                        <h1 className="font-semibold text-xl">_________ OUR BESTSELLERS</h1>
                        <h2 className="text-4xl font-semibold tracking-wide text-gray-900">
                            Latest <span className="italic">Arrivals</span>
                        </h2>
                        <h1 className="font-semibold text-xl uppercase">Shop Now _________</h1>
                    </div>
                    <div className="w-1/2">
                        <img src="https://forverecommerceclothing.vercel.app/assets/hero_img-DOCOb6wn.png" />
                    </div>
                </div>
                <div className="flex flex-col items-center ">
                    <h1 className="text-gray-700 text-3xl text-center pt-12 pb-6 ">LATEST <span className="text-black">COLLECTIONS _____</span></h1>
                    <p className="px-30">Discover our latest collections featuring trendy designs and high-quality materials. Stay ahead in fashion with our new arrivals that blend style and comfort seamlessly.</p>
                    <div className="py-10 grid grid-cols-4 gap-4">
                        {products
                            .slice()
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .slice(0, 8) 
                            .map((product) => {
                                return (
                                    <div onClick={()=>navigate(`/product/${product._id}`)} key={product._id} className=" cursor-pointer shadow-xl p-5 flex flex-col gap-2 rounded-sm">
                                        <img className="h-[300px] " src={product.images[0]} />
                                        <h1>Price: ${product.price}</h1>
                                        <h1 className="font-semibold">{product.productName}</h1>

                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div>
                    <h1 className="text-gray-700 text-3xl text-center pt-12 pb-6 ">BEST <span className="text-black">SELLER _____</span></h1>
                    <p className="px-30">Our most loved pieces, chosen by customers for their quality, comfort,
                        and timeless style. Shop what everyone’s talking about.</p>
                    <div className="py-10 grid grid-cols-4 gap-4">
                        {
                            products.filter((product) => product.bestseller === true).map((product) => {
                                return (
                                    <div onClick={()=>navigate(`/product/${product._id}`)} key={product._id} className="shadow-xl p-5 flex flex-col cursor-pointer gap-2 rounded-sm">
                                        <img className="h-[300px] " src={product.images[0]} />
                                        <h1>Price: ${product.price}</h1>
                                        <h1 className="font-semibold">{product.productName}</h1>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="py-20 flex justify-between">
                    <div className="flex gap-1 flex-col items-center border border-black/20 p-8 rounded-xl transition-transform duration-300 hover:scale-110">
                        <h1 className="font-bold text-5xl"><RiExchangeFundsFill /></h1>
                        <h2 className='font-semibold text-lg'>Easy Exchange Policy</h2>
                        <p className="text-gray-700">We offer hassle free exchange policy</p>
                    </div>
                    <div className="flex gap-1 flex-col items-center border border-black/20 p-8 rounded-xl transition-transform duration-300 hover:scale-110">
                        <h1 className="font-bold text-5xl "><TbTruckReturn /></h1>
                        <h2 className='font-semibold text-lg'>7 Days Return Policy</h2>
                        <p className="text-gray-700">We provide 7 days return policy</p>
                    </div>
                    <div className="flex gap-1 flex-col items-center border border-black/20 p-8 rounded-xl transition-transform duration-300 hover:scale-110">
                        <h1 className="font-bold text-5xl"><RiCustomerServiceLine /></h1>
                        <h2 className='font-semibold text-lg'>Best customer support</h2>
                        <p className="text-gray-700">We provide 24/7 customer support</p>
                    </div>
                </div>
                <Subscribe />
            </div>
        </Wrapper>
    )
}