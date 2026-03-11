import Image from "next/image";
import { Clock3, MapPin, Mail, Share2 } from "lucide-react";
import getData from "@/service/api";
import { PackageType } from "@/types/PackageTypes";



const TourCardsSarch = async() => {
    const packagcard = await getData({ url:"package"})
    console.log(packagcard);
    
    return (
        <section className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {packagcard.map((tour:PackageType) => (
                    <div
                        key={tour.id}
                        className="bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                    >
                        <div className="relative h-[170px] w-full">
                            <Image
                                src={tour.cover_image}
                                alt={tour.package_type}
                                fill
                                className="object-cover"
                            />

                         
                                <span className="absolute top-3 right-3 bg-rose-400 text-white text-[10px] font-semibold px-3 py-1 rounded-full tracking-wide">
                                   SALE
                                </span>
                    
                        </div>
<div className="px-4 pb-4 mt-4 ">
                            <div className=" border-gray-100 px-4 py-3 flex items-center justify-between text-[12px] text-gray-400 shadow-sm rounded-xl">
                                <div className="flex items-center gap-2">
                                    <Clock3 className="w-3.5 h-3.5 text-rose-400 cursor-pointer" />
                                    <span>{tour?.discount_pct}Days</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="w-3.5 h-3.5 text-rose-400 cursor-pointer" />
                                    <Share2 className="w-3.5 h-3.5 text-rose-400 cursor-pointer" />
                                </div>
                            </div>
</div>
                        

                        <div className="p-5">
                            <h3 className="text-[20px] font-bold text-black">{tour?.departure_city}</h3>

                            <div className="flex items-center gap-1 mt-1 text-[13px] text-gray-400">
                                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                                <span>{tour?.title_uz
}</span>
                            </div>

                            <p className="text-[13px] text-gray-400 leading-6 mt-5 min-h-[90px]">
                                {tour.description}
                            </p>

                            <div className="border-t border-gray-100 mt-5 pt-5 flex items-end justify-between">
                                <button
                                    className= "text-white text-[12px] font-semibold px-5 py-2 rounded bg-rose-400"
                                >
                                    Details
                                </button>

                                <div className="text-right">
                                    <p className="text-[12px] text-gray-400">From</p>
                                    <div className="flex items-end gap-1">
                                        <span className="text-[30px] font-bold text-black leading-none">
                                           ${tour?.total_price}
                                        </span>
                                        {tour?.total_price && (
                                            <span className="text-[12px] text-gray-400 line-through mb-1">
                                                ${tour?. original_price}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TourCardsSarch;