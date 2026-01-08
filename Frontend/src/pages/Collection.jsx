import { Wrapper } from "../components/Wrapper"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { fetchProducts, clearSearchInput } from "../redux/productSlice.js"
import { useNavigate } from "react-router-dom"
import { FiFilter } from "react-icons/fi"
import { IoClose } from "react-icons/io5"

export const Collection = () => {
    const { products, searchInput } = useSelector(state => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [filters, setFilters] = useState({
        men: false,
        women: false,
        kids: false,
        topwear: false,
        bottomwear: false,
        winterwear: false,
        sortBy: ""
    })

    const [showMobileFilters, setShowMobileFilters] = useState(false)

    const handleChange = (e) => {
        const { name, checked, value, type } = e.target
        setFilters(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const searchedProducts = searchInput
        ? products.filter(product =>
            product.productName.toLowerCase().includes(searchInput.toLowerCase())
        )
        : products

    const filteredProducts = searchedProducts.filter(product => {
        const categorySelected = filters.men || filters.women || filters.kids
        const subCategorySelected = filters.topwear || filters.bottomwear || filters.winterwear
        const categoryKey = product.category?.toLowerCase()
        const subCategoryKey = product.subCategory?.toLowerCase()
        const categoryMatch = categorySelected ? filters[categoryKey] : true
        const subCategoryMatch = subCategorySelected ? filters[subCategoryKey] : true
        return categoryMatch && subCategoryMatch
    })

    useEffect(() => {
        dispatch(fetchProducts())
        return () => dispatch(clearSearchInput())
    }, [dispatch])

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (filters.sortBy === "lowtohigh") return a.price - b.price
        if (filters.sortBy === "hightolow") return b.price - a.price
        return 0
    })

    return (
        <Wrapper>
            <div className="px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6">
                {/* Sidebar for Desktop */}
                <div className="hidden md:flex md:w-[200px] flex-col gap-6 py-8">
                    <h1 className="text-2xl font-semibold">FILTERS</h1>

                    <div className="border border-black/20 p-6 rounded">
                        <h1 className="font-semibold py-2">CATEGORIES</h1>
                        <div className="flex flex-col gap-2">
                            <label className="flex gap-2 items-center">
                                <input type="checkbox" name="men" checked={filters.men} onChange={handleChange} />
                                Men
                            </label>
                            <label className="flex gap-2 items-center">
                                <input type="checkbox" name="women" checked={filters.women} onChange={handleChange} />
                                Women
                            </label>
                            <label className="flex gap-2 items-center">
                                <input type="checkbox" name="kids" checked={filters.kids} onChange={handleChange} />
                                Kids
                            </label>
                        </div>
                    </div>

                    <div className="border border-black/20 p-6 rounded">
                        <h1 className="font-semibold py-2">TYPE</h1>
                        <div className="flex flex-col gap-2">
                            <label className="flex gap-2 items-center">
                                <input type="checkbox" name="topwear" checked={filters.topwear} onChange={handleChange} />
                                Topwear
                            </label>
                            <label className="flex gap-2 items-center">
                                <input type="checkbox" name="bottomwear" checked={filters.bottomwear} onChange={handleChange} />
                                Bottomwear
                            </label>
                            <label className="flex gap-2 items-center">
                                <input type="checkbox" name="winterwear" checked={filters.winterwear} onChange={handleChange} />
                                Winterwear
                            </label>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-2 px-6 rounded">
                        <button className="w-full font-semibold" onClick={() => setFilters({
                            men: false,
                            women: false,
                            kids: false,
                            topwear: false,
                            bottomwear: false,
                            winterwear: false,
                            sortBy: ""
                        })}>
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Mobile Filter & Sort Bar */}
                <div className="flex md:hidden justify-between items-center py-4">
                    <button
                        className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded"
                        onClick={() => setShowMobileFilters(true)}
                    >
                        <FiFilter size={20} /> Filters
                    </button>
                    <select
                        onChange={handleChange}
                        value={filters.sortBy}
                        name="sortBy"
                        className="
                           border border-black/20 rounded
                             px-2 py-1
                               text-sm
                            sm:text-base
                           outline-none
                           "
                    >
                        <option value="">Relevant</option>
                        <option value="lowtohigh">Low to High</option>
                        <option value="hightolow">High to Low</option>
                    </select>

                </div>

                {/* Mobile Filters Modal */}
                {showMobileFilters && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
                        <div className="bg-white w-3/4 max-w-xs h-full p-6 flex flex-col gap-6 relative">
                            <button
                                className="absolute top-4 right-4 text-xl"
                                onClick={() => setShowMobileFilters(false)}
                            >
                                <IoClose />
                            </button>
                            <h1 className="text-2xl font-semibold">FILTERS</h1>

                            <div className="border border-black/20 p-4 rounded">
                                <h1 className="font-semibold py-2">CATEGORIES</h1>
                                <div className="flex flex-col gap-2">
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" name="men" checked={filters.men} onChange={handleChange} />
                                        Men
                                    </label>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" name="women" checked={filters.women} onChange={handleChange} />
                                        Women
                                    </label>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" name="kids" checked={filters.kids} onChange={handleChange} />
                                        Kids
                                    </label>
                                </div>
                            </div>

                            <div className="border border-black/20 p-4 rounded">
                                <h1 className="font-semibold py-2">TYPE</h1>
                                <div className="flex flex-col gap-2">
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" name="topwear" checked={filters.topwear} onChange={handleChange} />
                                        Topwear
                                    </label>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" name="bottomwear" checked={filters.bottomwear} onChange={handleChange} />
                                        Bottomwear
                                    </label>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" name="winterwear" checked={filters.winterwear} onChange={handleChange} />
                                        Winterwear
                                    </label>
                                </div>
                            </div>

                            <div className="bg-gray-200 p-2 px-4 rounded">
                                <button className="w-full font-semibold" onClick={() => setFilters({
                                    men: false,
                                    women: false,
                                    kids: false,
                                    topwear: false,
                                    bottomwear: false,
                                    winterwear: false,
                                    sortBy: ""
                                })}>
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Section */}
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between py-6">
                        <h1 className="text-gray-700 text-2xl sm:text-3xl  text-center md:text-left">
                            ALL <span className="text-black">COLLECTIONS _____</span>
                        </h1>
                        <select
                            onChange={handleChange}
                            value={filters.sortBy}
                            name="sortBy"
                            className="hidden lg:block border border-black/20 p-2 rounded "
                        >
                            <option value="">Relevant</option>
                            <option value="lowtohigh">Low to High</option>
                            <option value="hightolow">High to Low</option>
                        </select>

                    </div>
                    <div className="pb-10">
                        {sortedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {sortedProducts.map(product => (
                                    <div key={product._id} className=" flex flex-col p-5 bg-gray-100 rounded-sm shadow-xl">
                                        <div
                                            onClick={() => navigate(`/product/${product._id}`)}
                                            className="cursor-pointer flex flex-col gap-2"
                                        >
                                            <img
                                                className="transition-transform duration-300 hover:scale-95 h-60 w-full object-cover rounded"
                                                src={product.images[0]}
                                                alt={product.productName}
                                            />
                                            <h1>Price: ${product.price}</h1>
                                            <h1 className="font-semibold">{product.productName}</h1>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 text-lg py-20">
                                No matching products found.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </Wrapper>
    )
}
