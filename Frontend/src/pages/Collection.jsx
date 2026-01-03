import { Wrapper } from "../components/Wrapper"

export const Collection = () => {
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
                                <input type="checkbox" />
                                Men
                            </label>
                            <label className="flex gap-2">
                                <input type="checkbox" />
                                Women
                            </label>
                            <label className="flex gap-2">
                                <input type="checkbox" />
                                Kids
                            </label>
                        </div>
                    </div>
                    <div className="border border-black/20 p-8">
                        <h1 className="font-semibold py-2">TYPE</h1>
                        <div className="flex flex-col  gap-2 ">
                            <label className="flex gap-2">
                                <input type="checkbox" />
                                Topwear
                            </label>
                            <label className="flex gap-2">
                                <input type="checkbox" />
                                bottomwear
                            </label>
                            <label className="flex gap-2">
                                <input type="checkbox" />
                                Winterwear
                            </label>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col">
                    <div className="flex py-8 justify-between gap-60">
                        <div>
                            <h1 className="text-gray-700 text-3xl text-center " >ALL <span className="text-black">COLLECTIONS _____</span></h1>
                        </div>
                        <div className="border border-black/20 p-2">
                            <select className="outline-none">
                                <option>Sort by: Relavent</option>
                                <option>Sort by: Low to High</option>
                                <option>Sort by: High to Low</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        images
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}