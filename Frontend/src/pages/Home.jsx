import { Wrapper } from "../components/Wrapper"
import { RiExchangeFundsFill } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
import { Subscribe } from "../components/Subscribe";
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchProducts } from "../redux/productSlice.js"
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const { products, loading } = useSelector(state => state.product)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    return (
        <Wrapper>
            <div className="px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="flex flex-col sm:flex-row my-12 border border-black/20">
                    <div className="sm:w-1/2 flex flex-col items-center justify-center gap-4 text-center lg:text-left">
                        <h1 className="font-semibold text-lg sm:text-xl">_________ OUR BESTSELLERS</h1>
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-wide text-gray-900">
                            Latest <span className="italic">Arrivals</span>
                        </h2>
                        <h1 className="font-semibold text-lg sm:text-xl uppercase">Shop Now _________</h1>
                    </div>
                    <div className="sm:w-1/2 mt-6 lg:mt-0 flex justify-center">
                        <img className="w-full max-w-md lg:max-w-full object-contain" src="https://forverecommerceclothing.vercel.app/assets/hero_img-DOCOb6wn.png" alt="Hero" />
                    </div>
                </div>

                {/* Latest Collections */}
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-gray-700 text-2xl sm:text-3xl pt-12 pb-6">
                        LATEST <span className="text-black">COLLECTIONS _____</span>
                    </h1>
                    <p className="max-w-3xl px-2 sm:px-0 text-sm sm:text-base">
                        Discover our latest collections featuring trendy designs and high-quality materials. Stay ahead in fashion with our new arrivals that blend style and comfort seamlessly.
                    </p>
                    <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                        {products
                            .slice()
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .slice(0, 4)
                            .map((product) => (
                                <div key={product._id} onClick={() => navigate(`/product/${product._id}`)} className="cursor-pointer shadow-xl p-5 flex flex-col gap-2 rounded-sm hover:scale-105 transition-transform">
                                    <img className="h-60 sm:h-72 w-full object-cover rounded" src={product.images[0]} alt={product.productName} />
                                    <h1>Price: ${product.price}</h1>
                                    <h1 className="font-semibold">{product.productName}</h1>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Best Sellers */}
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-gray-700 text-2xl sm:text-3xl pt-12 pb-6">
                        BEST <span className="text-black">SELLER _____</span>
                    </h1>
                    <p className="max-w-3xl px-2 sm:px-0 text-sm sm:text-base">
                        Our most loved pieces, chosen by customers for their quality, comfort, and timeless style. Shop what everyone’s talking about.
                    </p>
                    <div className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                        {products.filter(product => product.bestseller).map(product => (
                            <div key={product._id} onClick={() => navigate(`/product/${product._id}`)} className="cursor-pointer shadow-xl p-5 flex flex-col gap-2 rounded-sm hover:scale-105 transition-transform">
                                <img className="h-60 sm:h-72 w-full object-cover rounded" src={product.images[0]} alt={product.productName} />
                                <h1>Price: ${product.price}</h1>
                                <h1 className="font-semibold">{product.productName}</h1>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Policies Section */}
                <div className="py-20 flex flex-col md:flex-row gap-6 md:gap-4 justify-between">
                    <div className="flex gap-2 flex-col items-center border border-black/20 p-6 md:p-8 rounded-xl transition-transform duration-300 hover:scale-105">
                        <h1 className="font-bold text-4xl sm:text-5xl"><RiExchangeFundsFill /></h1>
                        <h2 className='font-semibold text-lg'>Easy Exchange Policy</h2>
                        <p className="text-gray-700 text-sm sm:text-base">We offer hassle free exchange policy</p>
                    </div>
                    <div className="flex gap-2 flex-col items-center border border-black/20 p-6 md:p-8 rounded-xl transition-transform duration-300 hover:scale-105">
                        <h1 className="font-bold text-4xl sm:text-5xl"><TbTruckReturn /></h1>
                        <h2 className='font-semibold text-lg'>7 Days Return Policy</h2>
                        <p className="text-gray-700 text-sm sm:text-base">We provide 7 days return policy</p>
                    </div>
                    <div className="flex gap-2 flex-col items-center border border-black/20 p-6 md:p-8 rounded-xl transition-transform duration-300 hover:scale-105">
                        <h1 className="font-bold text-4xl sm:text-5xl"><RiCustomerServiceLine /></h1>
                        <h2 className='font-semibold text-lg'>Best customer support</h2>
                        <p className="text-gray-700 text-sm sm:text-base">We provide 24/7 customer support</p>
                    </div>
                </div>

                <Subscribe />
            </div>
        </Wrapper>
    )
}
