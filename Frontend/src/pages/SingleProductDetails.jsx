import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { Wrapper } from "../components/Wrapper";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts } from "../redux/productSlice.js"
import { addToCart } from "../redux/cartSlice.js";
import toast from "react-hot-toast"
import { setBuyNowItem } from "../redux/buyNow.js";
import { fetchProductReviews, checkCanReview, fetchUserReview } from "../redux/reviewSlice.js"
import ReviewTab from "../pages/ReviewTab.jsx"





export const SingleProductDetails = () => {

    const { products } = useSelector(state => state.product)
    const [selectedSize, setSelectedSize] = useState(null)
    const dispatch = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [activeTab, setActiveTab] = useState("description");
    const { userReview, reviews, count, canReview } = useSelector(state => state.review);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const hasReviews = reviews.length > 0;

    const averageRating = hasReviews
        ? (
            reviews.reduce((acc, r) => acc + r.ratings, 0) / reviews.length
        ).toFixed(1)
        : 0;

    useEffect(() => {
        if (userReview) {
            setRating(userReview.ratings);
            setComment(userReview.comment);
        }
    }, [userReview]);


    useEffect(() => {
        dispatch(fetchProductReviews(id));

        if (isAuthenticated) {
            dispatch(checkCanReview(id));
            dispatch(fetchUserReview(id));
        }
    }, [activeTab, id, isAuthenticated, dispatch]);



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


    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error("Please select size")
            return;
        }

        dispatch(addToCart({
            productId: product._id,
            size: selectedSize,
            quantity: 1,
        }));


        toast.success("Product added!!")
    };

    const handleBuy = () => {
        if (!selectedSize) {
            toast.error("Please select size")
            return;
        }

        dispatch(setBuyNowItem({
            product: {
                _id: product._id,
                productName: product.productName,
                price: product.price,
                images: product.images,
            },
            quantity: 1,
            size: selectedSize
        }));

      

        navigate("/checkout");
    }

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
                        <div className="flex gap-2 items-center">
                            {hasReviews ? (
                                <>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={`text-sm ${star <= Math.round(averageRating)
                                                    ? "text-yellow-500"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-700">
                                        {averageRating} ({count} Reviews)
                                    </span>
                                </>
                            ) : (
                                <h1 className="text-sm text-yellow-200 flex items-center"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /><span className="px-4 text-gray-500">No ratings (0 reviews)</span></h1>
                            )}
                        </div>
                    </div>
                    <h1 className="text-3xl font-semibold">${product.price}</h1>
                    <p className="text-gray-600">{product.description}</p>
                    <h1 className="font-semibold pt-6">Select Sizes:</h1>
                    <div className="flex gap-6">
                        {
                            product.sizes.map((size) => {
                                return (
                                    <button

                                        key={size}
                                        className={`p-2  px-4 ${selectedSize === size ? "bg-black text-white" : "bg-gray-200 "} `}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                )
                            })
                        }
                    </div>
                    <div className="flex gap-6">
                        <button onClick={handleAddToCart} className="cursor-pointer bg-black text-white p-2 px-4 my-6">Add to Cart</button>
                        <button onClick={handleBuy} className="cursor-pointer bg-black text-white p-2 px-4 my-6">Buy Now</button>
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
                        }`}>Reviews({count}) </button>
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


                {activeTab === "reviews" && (
                    <div className="border p-6 space-y-6">


                        {!isAuthenticated && (
                            <h1 className="border border-gray-200 bg-gray-100 p-4">Please<span className="underline font-bold cursor-pointer" onClick={() => navigate("/login")}>login</span> to write a review. Only verified purchasers can submit reviews.</h1>
                        )}


                        {isAuthenticated && canReview === false && (
                            <h1 className="border border-yellow-300 bg-yellow-50 p-4 font-semibold text-sm text-red-800">Note: <span className="font-normal">You must purchase this product before you can submit a review. This helps us maintain authentic and verified reviews.</span></h1>
                        )}


                        {isAuthenticated && canReview === true && (
                            <ReviewTab
                                productId={id}
                                rating={rating}
                                setRating={setRating}
                                comment={comment}
                                setComment={setComment}
                            />
                        )}

                        <div className="border-t-1 border-gray-200 py-6">
                            <h2 className="font-bold">
                                Customer Reviews ({count})
                            </h2>

                            {reviews.length === 0 && (
                                <p className="text-gray-500">No reviews yet.</p>
                            )}


                            {reviews.map(r => (
                                <div key={r._id} className="py-4">
                                    {console.log(r)}
                                    <div className="flex gap-4 py-2 items-center">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    className={`text-sm ${star <= r.ratings ? "text-yellow-400" : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <h1 className="font-semibold">{r.user.name}</h1>
                                        <h1 className="text-xs text-gray-500">
                                            {new Date(r.createdAt).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </h1>

                                    </div>

                                    <p className="text-sm">{r.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


            </div >
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

                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            }
        </Wrapper >
    )
}