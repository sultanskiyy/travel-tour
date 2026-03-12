"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const typologyOptions = [
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
];

const durationOptions = ["1 Week", "10 Days", "15 Days", "5 Days"];
const difficultyOptions = ["Challenging", "Difficult", "Easy", "Medium"];
const minAgeOptions = ["0", "16", "18", "5"];

const FilterSearch = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    const updateCheckboxArray = (key: string, value: string, checked: boolean) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentValues = params.getAll(key);

        let nextValues: string[] = [];

        if (checked) {
            nextValues = [...currentValues, value];
        } else {
            nextValues = currentValues.filter((item) => item !== value);
        }

        params.delete(key);
        nextValues.forEach((item) => params.append(key, item));

        router.push(`${pathname}?${params.toString()}`);
    };

    const updatePromo = (checked: boolean) => {
        const params = new URLSearchParams(searchParams.toString());

        if (checked) {
            params.set("onlyPromo", "1");
        } else {
            params.delete("onlyPromo");
        }

        router.push(`${pathname}?${params.toString()}`);
    };

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
                        defaultValue={searchParams.get("destination") || ""}
                        onChange={(e) => updateParam("destination", e.target.value)}
                        className="w-full h-10 px-3 border border-gray-200 text-sm outline-none placeholder:text-gray-400"
                    />
                </div>

                <div>
                    <h3 className="text-[15px] font-semibold text-black mb-3">
                        Select your date :
                    </h3>
                    <input
                        type="date"
                        defaultValue={searchParams.get("date") || ""}
                        onChange={(e) => updateParam("date", e.target.value)}
                        className="w-full h-10 px-3 border border-gray-200 text-sm outline-none"
                    />
                </div>

                <div>
                    <h3 className="text-[15px] font-semibold text-black mb-4">
                        Typologies :
                    </h3>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[13px] text-gray-500">
                        {typologyOptions.map((item, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-3.5 h-3.5"
                                    checked={searchParams.getAll("typology").includes(item)}
                                    onChange={(e) =>
                                        updateCheckboxArray("typology", item, e.target.checked)
                                    }
                                />
                                <span>{item}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-[15px] font-semibold text-black mb-4">
                        Max Price :
                    </h3>

                    <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        defaultValue={searchParams.get("maxPrice") || "5000"}
                        onChange={(e) => updateParam("maxPrice", e.target.value)}
                        className="w-full"
                    />

                    <div className="flex justify-end mt-3 text-sm text-gray-500">
                        $ {searchParams.get("maxPrice") || "5000"}
                    </div>

                    <label className="flex items-center gap-2 mt-4 text-[13px] text-gray-500">
                        <input
                            type="checkbox"
                            className="w-3.5 h-3.5"
                            checked={searchParams.get("onlyPromo") === "1"}
                            onChange={(e) => updatePromo(e.target.checked)}
                        />
                        <span>See only promotions</span>
                    </label>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[15px] font-semibold text-black">Durations :</h3>
                        <span className="text-gray-400 text-sm">⌃</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-[13px] text-gray-500">
                        {durationOptions.map((item, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-3.5 h-3.5"
                                    checked={searchParams.getAll("duration").includes(item)}
                                    onChange={(e) =>
                                        updateCheckboxArray("duration", item, e.target.checked)
                                    }
                                />
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
                        {difficultyOptions.map((item, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-3.5 h-3.5"
                                    checked={searchParams.getAll("difficulty").includes(item)}
                                    onChange={(e) =>
                                        updateCheckboxArray("difficulty", item, e.target.checked)
                                    }
                                />
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
                        {minAgeOptions.map((item, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-3.5 h-3.5"
                                    checked={searchParams.getAll("minAge").includes(item)}
                                    onChange={(e) =>
                                        updateCheckboxArray("minAge", item, e.target.checked)
                                    }
                                />
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