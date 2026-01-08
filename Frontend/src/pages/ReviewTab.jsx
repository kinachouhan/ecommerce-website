import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { submitReview } from "../redux/reviewSlice";
import { FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";

const ReviewTab = ({ productId, rating, setRating, comment, setComment }) => {
    const dispatch = useDispatch();
    const { userReview } = useSelector(state => state.review);

    const handleSubmit = async () => {
        if (!rating || !comment.trim()) {
            toast.error("Please provide rating and comment");
            return;
        }

        const resultAction = await dispatch(submitReview({ productId, rating, comment }));

        if (submitReview.fulfilled.match(resultAction)) {
            toast.success(userReview ? "Review updated!" : "Review submitted!");
            setRating(rating);
            setComment(comment);
        } else {
            toast.error(resultAction.payload || "Failed to submit review");
        }
    };

    return (
        <div className="bg-gray-50 p-4 rounded-md shadow-sm w-full ">
            <h2 className="font-semibold text-md mb-2 text-gray-800">Your Review:</h2>

            <label className="block text-sm text-gray-700 font-semibold mb-2">
                Rating *
            </label>
            <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar
                        key={i}
                        className={`cursor-pointer text-3xl sm:text-2xl ${
                            i <= rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setRating(i)}
                    />
                ))}
            </div>

            <label className="block text-sm text-gray-700 font-semibold mb-2">
                Comment *
            </label>
            <textarea
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-black focus:outline-none resize-none"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
            />

            <button
                className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition w-full sm:w-auto"
                onClick={handleSubmit}
            >
                {userReview ? "Update Review" : "Submit Review"}
            </button>
        </div>
    );
};

export default ReviewTab;
