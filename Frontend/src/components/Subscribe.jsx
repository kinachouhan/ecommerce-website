export const Subscribe = () => {
    return (
        <div className="py-12 flex flex-col justify-center items-center gap-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl sm:text-2xl font-bold text-center">Subscribe now & get 10% off</h1>
            <p className="text-gray-700 text-sm sm:text-base text-center">
                Subscribe to our newsletter to get updates on our latest offers!!
            </p>
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 mt-4">
                <input
                    className="border border-black/20 p-2 outline-none w-full sm:w-64 md:w-80 rounded-sm"
                    placeholder="Enter your email"
                    type="email"
                />
                <button className="bg-black text-white p-2 px-4 rounded-sm w-full sm:w-auto">
                    Subscribe
                </button>
            </div>
        </div>
    )
}
