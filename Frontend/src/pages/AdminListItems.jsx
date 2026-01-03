import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchProducts } from "../redux/productSlice.js"
import toast from "react-hot-toast"


export const AdminListItems = () => {


    const { products, loading } = useSelector(state => state.product)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
  
    const handleDelete = async(id)=>{
         const res = await fetch (`http://localhost:3200/api/v1/products/delete/${id}`,{
             method: "DELETE"
         })

         const data = await res.json()

         if(data.success){
             return toast.success("Product deleted successfully")
         }else{
            return toast.error("please try again")
         }    
    }

    return (
        <>
            {loading ?
                <p>Loading...</p>
                :
                <div className="p-6">
                    <h1 className="text-xl font-semibold mb-4">All Products</h1>

                    {
                        products.length === 0
                            ?
                            <div>
                                No Products found.
                            </div>
                            :
                            <div className="flex flex-col gap-2">
                                <div className="grid grid-cols-5 bg-gray-100 text-center font-medium border border-gray-300 rounded-sm overflow-hidden">
                                    <div className="p-2">Image</div>
                                    <div className="p-2">Name</div>
                                    <div className="p-2">Category</div>
                                    <div className="p-2">Price</div>
                                    <div className="p-2">Action</div>
                                </div>
                                {
                                    products.map((product) => {
                                        return (
                                                <div key={product._id} className="grid grid-cols-5 text-center items-center justify-center px-2 pb-4 border border-gray-300 rounded-sm overflow-hidden">

                                                    <div className="flex justify-center">
                                                        <img
                                                            className="h-20 w-20 object-cover"
                                                            src={product.images[0]}
                                                        />
                                                    </div>
                                                    <div>{product.productName}</div>
                                                    <div>{product.category}</div>
                                                    <div>${product.price}</div>
                                                    <button onClick={()=>handleDelete(product._id)}className="text-red-500 font-bold cursor-pointer">X</button>
                                                </div>
                                         
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            }

        </>
    );
};
