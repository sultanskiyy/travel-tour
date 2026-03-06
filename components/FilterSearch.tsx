const FilterSearch = () => {
    return (
        <aside className="w-full max-w-[280px] bg-white p-6">
            <div className="space-y-8">
                <div>
                    <h3 className="text-[15px] font-semibold text-black mb-3">
                        Select your destination :
                    </h3>
                    <input
                        type="text"
                        placeholder="All Destinations"
                        className="w-full h-10 px-3 border border-gray-200 text-sm outline-none placeholder:text-gray-400"
                    />
                </div>

                <div>
                    <h3 className="text-[15px] font-semibold text-black mb-3">
                        Select your date :
                    </h3>
                    <input
                        type="text"
                        className="w-full h-10 px-3 border border-gray-200 text-sm outline-none"
                    />
                </div>

                <div>
                    <h3 className="text-[15px] font-semibold text-black mb-4">
                        Typologies :
                    </h3>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[13px] text-gray-500">
                        {[
                            "Sports Activities",
                            "Family-Friendly",
                            "Heritage Tours",
                            "Road Trips",
                            "Budget Travel",
                            "Culinary Tourism",
                            "Eco-tourism",
                            "Adventure Travel",
                            "Beach Holidays",
                            "Cultural Tours",
                        ].map((item, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input type="checkbox" className="w-3.5 h-3.5" />
                                <span>{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-[15px] font-semibold text-black mb-4">
                        Max Price :
                    </h3>

                    <div className="relative w-full h-2 bg-gray-200 rounded-full">
                        <div className="absolute left-0 top-0 h-2 w-[55%] bg-gray-500 rounded-full"></div>
                        <div className="absolute left-[55%] top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-700 rounded-sm"></div>
                    </div>

                    <div className="flex justify-end mt-3 text-sm text-gray-500">$ 5000</div>

                    <label className="flex items-center gap-2 mt-4 text-[13px] text-gray-500">
                        <input type="checkbox" className="w-3.5 h-3.5" />
                        <span>See only promotions</span>
                    </label>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[15px] font-semibold text-black">Durations :</h3>
                        <span className="text-gray-400 text-sm">⌃</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-[13px] text-gray-500">
                        {["1 Week", "10 Days", "15 Days", "5 Days"].map((item, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input type="checkbox" className="w-3.5 h-3.5" />
                                <span>{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[15px] font-semibold text-black">Difficulty :</h3>
                        <span className="text-gray-400 text-sm">⌃</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-[13px] text-gray-500">
                        {["Challenging", "Difficult", "Easy", "Medium"].map((item, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input type="checkbox" className="w-3.5 h-3.5" />
                                <span>{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[15px] font-semibold text-black">Min Age :</h3>
                        <span className="text-gray-400 text-sm">⌃</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-[13px] text-gray-500">
                        {["0", "16", "18", "5"].map((item, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input type="checkbox" className="w-3.5 h-3.5" />
                                <span>{item}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default FilterSearch;