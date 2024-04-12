const SkeletonProductCard = () => {
    return (
        <div className={`card max-w-md mx-auto mb-[50px] bg-gray-200 shadow-md rounded-lg overflow-hidden}`}>
            <div className="animate-pulse">
                <div className="h-[200px] bg-gray-400"></div>
                <div className="p-6">
                    <div className="font-bold text-xl mb-2 bg-gray-400 h-6 w-3/4"></div>
                    <p className="text-gray-700 text-base mb-4 bg-gray-400 h-4 w-3/4"></p>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-semibold bg-gray-400 h-6 w-1/4"></span>
                        <button className=" bg-gray-400 font-bold py-2 px-4 h-[40px] w-[110px] rounded">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonProductCard