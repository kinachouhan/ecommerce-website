
export const Subscribe = () => {
    return (
        <div className="py-12 pb-32 flex flex-col justify-center items-center gap-4">
            <h1 className="text-2xl font-bold">Subscribe now & get 10% off</h1>
            <p className="text-gray-700">Subscribe to our newsletter to get updates on our latest offers!!</p>
            <div className="w-full flex items-center justify-center">
                <input className="border border-black/20 p-2 outline-none w-[40%]" placeholder="Enter your email" type="email" />
                <button className="bg-black text-white p-2 px-4">Subscribe</button>
            </div>
        </div>
    )
}