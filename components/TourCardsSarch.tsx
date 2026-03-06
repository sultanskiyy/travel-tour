import Image from "next/image";
import { Clock3, MapPin, Mail, Share2 } from "lucide-react";

const tours = [
    {
        id: 1,
        title: "Chiang Mai",
        country: "Thailand",
        description:
            "Visit the temples and the Chiang Mai Night Bazaar, a huge huge market located on Chiang Klin Road.",
        duration: "1 Week",
        price: "$ 490",
        oldPrice: "",
        image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
        badge: "",
        accent: "bg-emerald-400",
        button: "bg-cyan-400",
        icon: "text-emerald-400",
    },
    {
        id: 2,
        title: "Chao Phraya",
        country: "Thailand",
        description:
            "Boat tour in the capital of Thailand, Bangkok, to see the beautiful palaces and monuments from the water.",
        duration: "5 Days",
        price: "$ 98",
        oldPrice: "$ 184",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
        badge: "SALE",
        accent: "bg-cyan-400",
        button: "bg-cyan-400",
        icon: "text-sky-400",
    },
    {
        id: 3,
        title: "Bangkok",
        country: "Thailand",
        description:
            "Marvelous culinary and cultural trip to the Thai capital with its wonderful monuments and Buddha statues.",
        duration: "10 Days",
        price: "$ 1000",
        oldPrice: "$ 1023",
        image:
            "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1200&auto=format&fit=crop",
        badge: "SALE",
        accent: "bg-fuchsia-300",
        button: "bg-fuchsia-400",
        icon: "text-fuchsia-400",
    },
    {
        id: 4,
        title: "Nara",
        country: "Japan",
        description:
            "Discover the incredible landmarks such as the Todai-ji temple and its famous Great Buddha statue.",
        duration: "15 Days",
        price: "$ 890",
        oldPrice: "$ 999",
        image:
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
        badge: "SALE",
        accent: "bg-rose-300",
        button: "bg-rose-400",
        icon: "text-rose-400",
    },
];

const TourCardsSarch = () => {
    return (
        <section className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tours.map((tour) => (
                    <div
                        key={tour.id}
                        className="bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                    >
                        <div className="relative h-[170px] w-full">
                            <Image
                                src={tour.image}
                                alt={tour.title}
                                fill
                                className="object-cover"
                            />

                            {tour.badge && (
                                <span className="absolute top-3 right-3 bg-rose-400 text-white text-[10px] font-semibold px-3 py-1 rounded-full tracking-wide">
                                    {tour.badge}
                                </span>
                            )}
                        </div>

                        <div className="border-b border-gray-100 px-4 py-3 flex items-center justify-between text-[12px] text-gray-400">
                            <div className="flex items-center gap-2">
                                <Clock3 className={`w-3.5 h-3.5 ${tour.icon}`} />
                                <span>{tour.duration}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className={`w-3.5 h-3.5 ${tour.icon}`} />
                                <Share2 className={`w-3.5 h-3.5 ${tour.icon}`} />
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-[20px] font-bold text-black">{tour.title}</h3>

                            <div className="flex items-center gap-1 mt-1 text-[13px] text-gray-400">
                                <MapPin className={`w-3.5 h-3.5 ${tour.icon}`} />
                                <span>{tour.country}</span>
                            </div>

                            <p className="text-[13px] text-gray-400 leading-6 mt-5 min-h-[90px]">
                                {tour.description}
                            </p>

                            <div className="border-t border-gray-100 mt-5 pt-5 flex items-end justify-between">
                                <button
                                    className={`${tour.button} text-white text-[12px] font-semibold px-5 py-2 rounded`}
                                >
                                    Details
                                </button>

                                <div className="text-right">
                                    <p className="text-[12px] text-gray-400">From</p>
                                    <div className="flex items-end gap-1">
                                        <span className="text-[30px] font-bold text-black leading-none">
                                            {tour.price}
                                        </span>
                                        {tour.oldPrice && (
                                            <span className="text-[12px] text-gray-400 line-through mb-1">
                                                {tour.oldPrice}
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