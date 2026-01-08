import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Wrapper } from "../components/Wrapper";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productSlice.js";
import { addToCart } from "../redux/cartSlice.js";
import toast from "react-hot-toast";
import { setBuyNowItem } from "../redux/buyNow.js";
import {
    fetchProductReviews,
    checkCanReview,
    fetchUserReview
} from "../redux/reviewSlice.js";
import ReviewTab from "../pages/ReviewTab.jsx";

export const SingleProductDetails = () => {

    const { products } = useSelector(state => state.product);
    const [selectedSize, setSelectedSize] = useState(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [activeTab, setActiveTab] = useState("description");
    const { userReview, reviews, count, canReview } = useSelector(state => state.review);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
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
        const res = await fetch(`http://localhost:3200/api/v1/products/product/${id}`);
        const data = await res.json();
        if (data.success) {
            setProduct(data.responseData);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const relatedProducts = products.filter(
        (prod) => prod.subCategory === product.subCategory && prod._id !== product._id

    );

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error("Please select size");
            return;
        }

        dispatch(addToCart({
            productId: product._id,
            size: selectedSize,
            quantity: 1,
        }));

        toast.success("Product added!!");
    };

    const handleBuy = () => {
        if (!selectedSize) {
            toast.error("Please select size");
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
    };

    const handleRelatedProductClick = (productId) => {
        navigate(`/product/${productId}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!product || !product.images || product.images.length === 0) {
        return (
            <Wrapper>
                <p>Loading...</p>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            {/* ================= PRODUCT SECTION ================= */}
            <div className="pt-6 flex flex-col lg:flex-row gap-8">

                {/* ===== IMAGE SECTION ===== */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">

                    {/* Main Image */}
                    <img
                        className="h-[260px] sm:h-[360px] md:h-[420px] lg:h-[480px] object-contain mx-auto"
                        src={product.images[0]}
                        alt={product.productName}
                    />

                    {/* Thumbnails – Flipkart style */}
                    <div className="flex gap-3 overflow-x-auto py-2">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                className="h-[70px] w-[70px] object-cover border rounded shrink-0 cursor-pointer"
                            />
                        ))}
                    </div>
                </div>

                {/* ===== PRODUCT DETAILS ===== */}
                <div className="w-full lg:w-1/2 flex flex-col  gap-3">

                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                        {product.productName}
                    </h1>

                    {/* Ratings */}
                    <div className="flex items-center gap-2">
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
                                <span className="text-xs text-gray-600">
                                    {averageRating} ({count} Reviews)
                                </span>
                            </>
                        ) : (
                            <span className="text-xs text-gray-500">
                                No ratings (0 reviews)
                            </span>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-semibold">
                        ${product.price}
                    </h1>

                    <p className="text-gray-600 text-sm sm:text-base">
                        {product.description}
                    </p>

                    {/* Sizes */}
                    <h1 className="font-semibold pt-4">Select Size</h1>
                    <div className="flex gap-3 flex-wrap">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 border ${selectedSize === size
                                    ? "bg-black text-white"
                                    : "bg-gray-100"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3  pt-4">
                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white px-3 py-2 w-full sm:w-auto"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuy}
                            className="bg-black text-white px-3 py-2 w-full sm:w-auto"
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* Info */}
                    <div className="text-sm text-gray-500 pt-4 space-y-1">
                        <p>100% Original product</p>
                        <p>Cash on delivery available</p>
                        <p>7 days return & exchange</p>
                    </div>
                </div>
            </div>

            {/* ================= TABS ================= */}
            <div className="my-16">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab("description")}
                        className={`border px-6 py-3 ${activeTab === "description" ? "bg-black text-white" : ""}`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`border px-6 py-3 ${activeTab === "reviews" ? "bg-black text-white" : ""}`}
                    >
                        Reviews ({count})
                    </button>
                </div>

                {activeTab === "description" && (
                    <div className="border p-6 text-sm text-gray-600 space-y-4">
                        <p>An e-commerce website enables users to browse and purchase products online.</p>
                        <p>It provides secure payment, product comparison, and easy checkout.</p>
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div className="border p-6 space-y-6">

                        {!isAuthenticated && (
                            <h1 className="border border-gray-200 bg-gray-100 p-4">
                                Please
                                <span
                                    className="underline font-bold cursor-pointer"
                                    onClick={() => navigate("/login")}
                                >
                                    login
                                </span>
                                to write a review. Only verified purchasers can submit reviews.
                            </h1>
                        )}

                        {isAuthenticated && canReview === false && (
                            <h1 className="border border-yellow-300 bg-yellow-50 p-4 font-semibold text-sm text-red-800">
                                Note:
                                <span className="font-normal">
                                    You must purchase this product before you can submit a review.
                                    This helps us maintain authentic and verified reviews.
                                </span>
                            </h1>
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

                        <div className="border-t border-gray-200 py-6">
                            <h2 className="font-bold">
                                Customer Reviews ({count})
                            </h2>

                            {reviews.length === 0 && (
                                <p className="text-gray-500">No reviews yet.</p>
                            )}

                            {reviews.map(r => (
                                <div key={r._id} className="py-4">
                                    <div className="flex gap-4 py-2 items-center">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    className={`text-sm ${star <= r.ratings
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
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

            </div>

            {/* ================= RELATED PRODUCTS ================= */}
            {relatedProducts.length > 0 && (
                <div>
                    <h1 className="text-center text-2xl font-semibold text-gray-600">
                        RELATED <span className="text-black">PRODUCTS_______</span>
                    </h1>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
                        {relatedProducts.map(p => (
                            <div key={p._id} className="bg-gray-100 p-4 shadow">
                                <div
                                    onClick={()=>handleRelatedProductClick(p._id)}
                                    className="cursor-pointer space-y-2"
                                >
                                    <img className="h-[180px] w-full object-cover" src={p.images[0]} />
                                    <p className="font-semibold">{p.productName}</p>
                                    <p>${p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Wrapper>
    );
};
