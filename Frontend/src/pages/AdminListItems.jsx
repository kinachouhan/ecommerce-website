export const AdminListItems = () => {
    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">All Products</h1>

            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-5 bg-gray-100 text-center font-medium border border-gray-300 rounded-sm overflow-hidden">
                    <div className="p-2">Image</div>
                    <div className="p-2">Name</div>
                    <div className="p-2">Category</div>
                    <div className="p-2">Price</div>
                    <div className="p-2">Action</div>
                </div>

                <div className="grid grid-cols-5 text-center items-center px-2 pb-4 border border-gray-300 rounded-sm overflow-hidden">

                    <div className="flex justify-center">
                        <img
                            className="h-20 w-20 object-cover"
                            src="https://ohtopten.com/wp-content/uploads/2015/08/Best-T-shirts-for-men-30.jpg"
                        />
                    </div>
                    <div>Women Round Neck</div>
                    <div>Women</div>
                    <div>$15</div>
                    <div className="text-red-500 font-bold cursor-pointer">X</div>
                </div>

                <div className="grid grid-cols-5 text-center items-center px-2 pb-4 border border-gray-300 rounded-sm overflow-hidden">

                    <div className="flex justify-center">
                        <img
                            className="h-20 w-20 object-cover"
                            src="https://ohtopten.com/wp-content/uploads/2015/08/Best-T-shirts-for-men-30.jpg"
                        />
                    </div>
                    <div>Women Round Neck</div>
                    <div>Women</div>
                    <div>$15</div>
                    <div className="text-red-500 font-bold cursor-pointer">X</div>
                </div>
            </div>
        </div>
    );
};
