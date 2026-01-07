import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitReview } from "../redux/reviewSlice";
import { FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";

const ReviewTab = ({ productId, rating, setRating, comment, setComment }) => {
    const dispatch = useDispatch();
    const { userReview } = useSelector(state => state.review);


    const handleSubmit = async() => {
        if (!rating || !comment.trim()) {
            toast.error("Please provide rating and comment");
            return;
        }

        const resultAction = await dispatch(submitReview({ productId, rating, comment }));

        if (submitReview.fulfilled.match(resultAction)) {
            toast.success(userReview ? "Review updated!" : "Review submitted!");
            // keep stars filled
            setRating(rating);
            setComment(comment);
        } else {
            toast.error(resultAction.payload || "Failed to submit review");
        }
    };


    return (
        <div className=" bg-gray-50">
            <h2 className="font-semibold mb-2 text-xl">Your Review</h2>

            <h1 className="text-sm text-gray-700 font-semibold py-2">Rating *</h1>

            <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map(i => (
                    <FaStar
                        key={i}
                        className={`cursor-pointer text-2xl ${i <= rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                        onClick={() => setRating(i)}
                    />
                ))}
            </div>

            <textarea
                className="border outline-none border-gray-300 p-2 w-full"
                rows={3}
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Write your review here...."
            />

            <button
                className="mt-2 bg-black text-white px-4 py-2"
                onClick={handleSubmit}
            >
                {userReview ? "Update Review" : "Submit Review"}
            </button>
        </div>
    );
};

export default ReviewTab;
