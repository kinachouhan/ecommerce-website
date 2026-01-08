import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchProducts, deleteProduct } from "../redux/productSlice.js"
import toast from "react-hot-toast"


export const AdminListItems = () => {


    const { products, loading } = useSelector(state => state.product)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
  

    const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Please try again");
    }
  };

    return (
        <>
  {loading ? (
    <p className="text-center mt-10 text-lg">Loading...</p>
  ) : (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-semibold mb-6">All Products</h1>

      {products.length === 0 ? (
        <div className="text-center text-gray-500">No Products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow py-4 flex flex-col items-center text-center"
            >
              {/* Product Image */}
              <img
                className="h-40 w-50 object-cover rounded-md mb-4"
                src={product.images[0]}
                alt={product.productName}
              />

              {/* Product Info */}
              <div className="mb-2 flex gap-1">
                <span className="font-semibold">Name: </span>
                <p className="text-gray-700">{product.productName}</p>
              </div>

              <div className="mb-2 flex gap-1">
                <span className="font-semibold">Category:</span>
                <p className="text-gray-700">{product.category}</p>
              </div>

              <div className="mb-4 flex gap-1">
                <span className="font-semibold">Price:</span>
                <p className="text-gray-700">${product.price}</p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleDelete(product._id)}
                className="text-white bg-red-500 hover:bg-red-600 font-semibold px-4 py-1 rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )}
</>

    );
};
