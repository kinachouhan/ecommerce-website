import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react"
import toast from "react-hot-toast"
import { useEffect } from "react"


export const AdminAddItems = () => {


    const sizes = ["S", "M", "L", "XL", "XXL"];
    const [loading, setLoading] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState([])

    const addSize = (size) => {
        setSelectedSizes((prev) =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        )
    }

    const [images, setImages] = useState([null, null, null, null]);
    const [previews, setPreviews] = useState([null, null, null, null]);

    const handleImages = (index, file) => {
        const updatedImages = [...images]
        const updatedPreviews = [...previews];
        updatedImages[index] = file
        updatedPreviews[index] = file ? URL.createObjectURL(file) : null;
        setImages(updatedImages)
        setPreviews(updatedPreviews);
    }



    const [productDetails, setProductDetails] = useState(
        {
            productName: "",
            description: "",
            price: "",
            category: "",
            subCategory: "",
            bestseller: false,
        }
    )


    const HandleChange = (e) => {
        const { name, value, type, checked } = e.target
        setProductDetails((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }





    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!productDetails.productName || !productDetails.description || !productDetails.category || !productDetails.subCategory || !productDetails.price || images.every((img) => img === null) || selectedSizes.length === 0) {
            return (
                toast.error("All Fields are required")
            )
        }

        const formData = new FormData()

        formData.append("productName", productDetails.productName);
        formData.append("description", productDetails.description);
        formData.append("price", productDetails.price);
        formData.append("category", productDetails.category);
        formData.append("subCategory", productDetails.subCategory);
        formData.append("bestseller", productDetails.bestseller);
        formData.append("sizes", JSON.stringify(selectedSizes));

        images.forEach(img => {
            if (img) formData.append("images", img);
        });

        setLoading(true)

        const res = await fetch("http://localhost:3200/api/v1/products/add", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        console.log(data)

        if (!data.success) {
            throw new Error(data.message || "Something went wrong");
        }
        toast.success("Product added successfully!")

        setLoading(false)

        setProductDetails({
            productName: " ",
            description: "",
            price: "",
            category: "",
            subCategory: "",
            bestseller: false,
        });
        setImages([null, null, null, null]);
        setSelectedSizes([]);

    }

    useEffect(() => {
        return () => {
            images.forEach(img => img && URL.revokeObjectURL(img));
        };
    }, [images]);



    return (
        <form
            onSubmit={handleSubmit}
            
            className="p-4 sm:p-6 flex flex-col gap-8 w-full"
        >
            {/* Upload Images */}
            <div className="flex gap-2 flex-col">
                <h1>Upload Image:</h1>

                <div className="flex gap-4 flex-wrap">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="overflow-hidden border border-gray-300 w-24 h-24"
                        >
                            <label className="relative w-full h-full block cursor-pointer">
                                <input
                                    accept="image/*"
                                    onChange={(e) => handleImages(index, e.target.files[0])}
                                    type="file"
                                    className="hidden"
                                />

                                {image ? (
                                    <img
                                        className="w-full h-full object-contain absolute"
                                        src={previews[index]}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                        <FaCloudUploadAlt className="text-3xl" />
                                        <span className="text-xs">Upload</span>
                                    </div>
                                )}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Name */}
            <div className="flex gap-2 flex-col">
                <h1>Product Name:</h1>
                <input
                    onChange={HandleChange}
                    name="productName"
                    className="border border-gray-300 rounded-sm p-2 w-full lg:w-1/2"
                    type="text"
                    placeholder="Type here..."
                />
            </div>

            {/* Product Description */}
            <div className="flex gap-2 flex-col">
                <h1>Product Description:</h1>
                <textarea
                    onChange={HandleChange}
                    name="description"
                    className="border border-gray-300 rounded-sm p-2 w-full lg:w-1/2 min-h-[120px]"
                    placeholder="Enter product description..."
                />
            </div>

            {/* Category / Subcategory / Price */}
            <div 
            
            className="flex flex-col  lg:flex-row gap-6 lg:gap-10 w-full w-1/2">
                <div className="flex gap-2 flex-col w-full">
                    <h1>Product Category</h1>
                    <select
                        onChange={HandleChange}
                        name="category"
                        className="border border-gray-400 py-2 rounded-sm px-4 outline-none w-full"
                    >
                        <option>Select Category</option>
                        <option>Men</option>
                        <option>Women</option>
                        <option>Kids</option>
                    </select>
                </div>

                <div className="flex gap-2 flex-col w-full">
                    <h1>Product SubCategory</h1>
                    <select
                        onChange={HandleChange}
                        name="subCategory"
                        className="border border-gray-400 py-2 rounded-sm px-4 outline-none w-full"
                    >
                        <option>Select Subcategory</option>
                        <option>Topwear</option>
                        <option>Bottomwear</option>
                        <option>Winterwear</option>
                    </select>
                </div>

                <div className="flex gap-2 flex-col w-full">
                    <h1>Product Price</h1>
                    <input
                        onChange={HandleChange}
                        name="price"
                        className="border border-gray-400 py-2 rounded-sm px-4 outline-none w-full"
                        placeholder="$100"
                    />
                </div>
            </div>

            {/* Product Size */}
            <div className="flex gap-2 flex-col">
                <h1>Product Size:</h1>
                <div className="flex gap-4 flex-wrap">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            type="button"
                            className={`px-4 py-2 border ${selectedSizes.includes(size)
                                    ? "bg-black text-white"
                                    : "bg-gray-100"
                                }`}
                            onClick={() => addSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bestseller */}
            <label className="flex gap-3 items-center">
                <input
                    onChange={HandleChange}
                    checked={productDetails.bestseller}
                    name="bestseller"
                    type="checkbox"
                />
                <span>Add to bestseller</span>
            </label>

            {/* Submit Button */}
            <div>
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-black text-white px-10 py-2 text-lg w-full sm:w-auto"
                >
                    {loading ? "Adding..." : "Add"}
                </button>
            </div>
        </form>

    )
}