import { Wrapper } from "../components/Wrapper"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { fetchProducts } from "../redux/productSlice.js"
import { useNavigate } from "react-router-dom"
import {addToCart} from "../redux/cartSlice.js"


export const Collection = () => {

    const { products} = useSelector(state => state.product)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const [filters, setFilters] = useState({
        men: false,
        women: false,
        kids: false,
        topwear: false,
        bottomwear: false,
        winterwear: false,
        sortBy: ""
    });

    const handleChange = (e) => {
        const { name, checked, value, type } = e.target
        setFilters((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const filteredProducts = products.filter(product => {

        const categorySelected =
            filters.men || filters.women || filters.kids;

        const subCategorySelected =
            filters.topwear || filters.bottomwear || filters.winterwear;

        const categoryKey = product.category?.toLowerCase();
        const subCategoryKey = product.subCategory?.toLowerCase();

        const categoryMatch = categorySelected
            ? filters[categoryKey]
            : true;

        const subCategoryMatch = subCategorySelected
            ? filters[subCategoryKey]
            : true;


        return categoryMatch && subCategoryMatch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (filters.sortBy === "lowtohigh") {
            return a.price - b.price;
        }

        if (filters.sortBy === "hightolow") {
            return b.price - a.price;
        }

        return 0; 
    });

    return (
        <Wrapper>
            <div className="flex  gap-10">
                <div className="h-screen w-[300px] flex flex-col gap-6  py-8">
                    <div>
                        <h1 className=" text-3xl">FILTERS</h1>
                    </div>
                    <div className="border border-black/20 p-8">
                        <h1 className="font-semibold py-2">CATEGORIES</h1>
                        <div className="flex flex-col  gap-2 ">
                            <label className="flex gap-2">
                                <input onChange={handleChange} type="checkbox" name="men" checked={filters.men} />
                                Men
                            </label>
                            <label className="flex gap-2">
                                <input onChange={handleChange} type="checkbox" name="women" checked={filters.women} />
                                Women
                            </label>
                            <label className="flex gap-2">
                                <input onChange={handleChange} type="checkbox" name="kids" checked={filters.kids} />
                                Kids
                            </label>
                        </div>
                    </div>
                    <div className="border border-black/20 p-8">
                        <h1 className="font-semibold py-2">TYPE</h1>
                        <div className="flex flex-col  gap-2 ">
                            <label className="flex gap-2">
                                <input onChange={handleChange} type="checkbox" name="topwear" checked={filters.topwear} />
                                Topwear
                            </label>
                            <label className="flex gap-2">
                                <input onChange={handleChange} type="checkbox" name="bottomwear" checked={filters.bottomwear} />
                                bottomwear
                            </label>
                            <label className="flex gap-2">
                                <input onChange={handleChange} type="checkbox" name="winterwear" checked={filters.winterwear} />
                                Winterwear
                            </label>
                        </div>
                    </div>
                    <div className="bg-gray-200  p-2 px-6">
                        <button onClick={() => setFilters({
                            men: false,
                            women: false,
                            kids: false,
                            topwear: false,
                            bottomwear: false,
                            winterwear: false,
                        })}>Clear Filters</button>
                    </div>

                </div>
                <div className="flex flex-col">
                    <div className="flex py-8 justify-between gap-60">
                        <div>
                            <h1 className="text-gray-700 text-3xl text-center " >ALL <span className="text-black">COLLECTIONS _____</span></h1>
                        </div>
                        <div className="border border-black/20 p-2">
                            <span>Sort By: </span>
                            <select onChange={(e) => handleChange(e)} value={filters.sortBy} name="sortBy" className="outline-none">
                                <option value=""> Relavent</option>
                                <option value="lowtohigh">Low to High</option>
                                <option value="hightolow"> High to Low</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            sortedProducts.map((product) => {
                                return (
                                    <div key={product._id} className="flex flex-col p-5 bg-gray-100 rounded-sm shadow-xl">
                                        <div onClick={() => navigate(`/product/${product._id}`)} className=" cursor-pointer  flex flex-col gap-2 ">
                                            <img className="h-[200px] " src={product.images[0]} />
                                            <h1>Price: ${product.price}</h1>
                                            <h1 className="font-semibold">{product.productName}</h1>
                                        </div>
                                       
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}