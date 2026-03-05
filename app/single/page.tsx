"use client"

import Image from "next/image"
import { useState } from "react"

const tourData = {
    title: "Chiang Mai",
    location: "Thailand",
    duration: "1 Week",
    difficulty: "Easy",
    minAge: 0,
    price: 490,
    description1:
        "Are you looking for an adventure of a lifetime? Join us on an unforgettable journey through some of the world's most stunning landscapes and cultural destinations. Our expertly curated tours take you to incredible destinations, from the rugged mountains of Patagonia to the vibrant cities of Asia. Our itineraries are designed to immerse you in the local culture, with opportunities to meet locals, try new foods, and learn about the history and traditions of each destination.",
    description2:
        "Our accommodations are carefully selected for comfort and convenience, with options to suit every budget. Whether you prefer luxurious hotels or cozy homestays, we have something for everyone. At every step of the journey, we prioritize sustainability and responsible tourism. We work with local communities to ensure that our tours have a positive impact on the environment and the people we meet along the way.",
    included: [
        "Train tickets and Bus transportation",
        "Breakfast, lunch, and dinner",
        "Accommodation at hotel",
        "Train tickets and Bus transportation",
    ],
    excluded: [
        "Professional tour guide",
        "Transfers between destinations",
        "Entrance fees to museums",
        "Custom itinerary",
    ],
    itinerary: [
        { day: 1, title: "Arrival and Orientation" },
        { day: 2, title: "City Tour" },
        { day: 3, title: "Cooking Class" },
        { day: 4, title: "Nature Hike" },
        { day: 5, title: "Free Day" },
    ],
    gallery: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
        "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=400&q=80",
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80",
    ],
    packages: [
        {
            name: "Athenes",
            location: "Greece",
            desc: "Immerse yourself in the history and culture of this ancient city as you explore the stunning Acropolis.",
            price: 677,
            weeks: 2,
            img: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80",
        },
        {
            name: "Azure Coast",
            location: "France",
            desc: "Escape to the azure coast and discover a world of breathtaking beauty and tranquility of coastline.",
            price: 400,
            weeks: 1,
            img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
        },
        {
            name: "Bangkok",
            location: "Thailand",
            desc: "Majestic culinary and cultural trip to the Thai capital with its wonderful monuments and Buddha statues.",
            price: 1000,
            weeks: 3,
            img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80",
        },
    ],
}

export default function TourPage() {
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)
    const [healthIns, setHealthIns] = useState(false)
    const [medicalIns, setMedicalIns] = useState(false)
    const [openDay, setOpenDay] = useState<number | null>(null)

    const total = tourData.price * adults + (healthIns ? 25 : 0) + (medicalIns ? 45 : 0)

    return (
        <div className="bg-white font-sans text-gray-800">
            {/* Hero Slider */}
            <div className="relative w-full h-64 md:h-96 overflow-hidden">
                {/* ✅ FIX: Next/Image needs fill or width/height */}
                <Image
                    src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=80"
                    alt="hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>

            {/* Tour Meta */}
            <div className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap items-center gap-6 border-b border-gray-200">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{tourData.title}</h1>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <span>📍</span> {tourData.location}
                    </p>
                </div>
                <div className="flex gap-6 ml-auto flex-wrap">
                    {[
                        { icon: "🕐", label: tourData.duration, sub: "" },
                        { icon: "🧭", label: tourData.difficulty, sub: "Difficulty" },
                        { icon: "👤", label: `Min Age`, sub: tourData.minAge },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="text-xl">{item.icon}</span>
                            <div>
                                <div className="font-semibold text-gray-800">{item.label}</div>
                                {item.sub !== "" && <div className="text-gray-400 text-xs">{item.sub}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
                {/* Left */}
                <div className="flex-1 min-w-0">
                    {/* Enjoy */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Enjoy the Adventure</h2>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{tourData.description1}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{tourData.description2}</p>
                    </section>

                    {/* Included/Excluded */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Included / Excluded</h2>
                        <p className="text-gray-500 text-sm mb-5">
                            To help you plan your trip, we have put together a list of whats included and whats not included in your
                            tour package.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                {tourData.included.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                                        <span className="text-green-500">✓</span> {item}
                                    </div>
                                ))}
                            </div>
                            <div>
                                {tourData.excluded.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                                        <span className="text-red-400">✗</span> {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Map */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold mb-2 text-gray-900">Tour Map</h2>
                        <p className="text-gray-500 text-sm mb-4">
                            This comprehensive map is designed to guide you through an exciting journey filled with remarkable
                            destinations and captivating experiences.
                        </p>
                        <div className="rounded-xl overflow-hidden border border-gray-200 h-56">
                            <iframe
                                title="Chiang Mai Map"
                                src="https://maps.google.com/maps?q=Chiang+Mai,Thailand&z=12&output=embed"
                                className="w-full h-full"
                                loading="lazy"
                            />
                        </div>
                    </section>

                    {/* Itinerary */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold mb-2 text-gray-900">Itinerary</h2>
                        <p className="text-gray-500 text-sm mb-5">
                            We have carefully planned out each day to give you the best possible experience from exploring historic
                            landmarks to tasting delicious local cuisine.
                        </p>
                        <div className="space-y-2">
                            {tourData.itinerary.map((item) => (
                                <button
                                    key={item.day}
                                    onClick={() => setOpenDay(openDay === item.day ? null : item.day)}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 hover:border-teal-400 transition-colors text-left"
                                >
                                    <span className="text-sm font-medium">
                                        <span className="text-teal-500 font-semibold mr-2">DAY {item.day} •</span>
                                        {item.title}
                                    </span>
                                    <span className="text-gray-400 text-lg">{openDay === item.day ? "‹" : "›"}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Gallery */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold mb-2 text-gray-900">Gallery</h2>
                        <p className="text-gray-500 text-sm mb-4">
                            Each image tells a unique story, inviting us into a world of emotion, beauty, and complexity.
                        </p>

                        {/* ✅ FIX: each Image needs fill + relative wrapper */}
                        <div className="grid grid-cols-3 gap-2">
                            {tourData.gallery.map((src, i) => (
                                <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                                    <Image
                                        src={src}
                                        alt={`gallery-${i}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right: Booking */}
                <div className="w-full lg:w-80 shrink-0">
                    <div className="sticky top-6 rounded-2xl border border-gray-200 shadow-lg p-6">
                        <p className="text-xs text-gray-400 mb-1">Price</p>
                        <p className="text-3xl font-bold text-gray-900 mb-4">
                            From <span className="text-teal-500">$ {tourData.price}</span>
                        </p>

                        <div className="flex gap-2 mb-5">
                            <button className="flex-1 bg-teal-500 text-white text-sm py-2 rounded-lg font-semibold hover:bg-teal-600 transition">
                                Booking Now
                            </button>
                            <button className="flex-1 border border-teal-500 text-teal-500 text-sm py-2 rounded-lg font-semibold hover:bg-teal-50 transition">
                                Inquiry Form
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="text-xs font-semibold text-gray-600 block mb-1">Date</label>
                            <input
                                type="date"
                                defaultValue="2024-03-12"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                            />
                        </div>

                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="text-sm font-semibold">Adults</p>
                                <p className="text-xs text-gray-400">Over 18 ( $ 490 )</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setAdults(Math.max(1, adults - 1))}
                                    className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 text-lg leading-none"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center text-sm font-bold">{adults}</span>
                                <button
                                    onClick={() => setAdults(adults + 1)}
                                    className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 text-lg leading-none"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <p className="text-sm font-semibold">Children</p>
                                <p className="text-xs text-gray-400">Under 18 ( $ 200 )</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setChildren(Math.max(0, children - 1))}
                                    className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 text-lg leading-none"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center text-sm font-bold">{children}</span>
                                <button
                                    onClick={() => setChildren(children + 1)}
                                    className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 text-lg leading-none"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <p className="text-xs font-semibold text-gray-600 mb-2">Extra Services</p>
                            <label className="flex items-center gap-2 text-sm text-gray-600 mb-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={healthIns}
                                    onChange={(e) => setHealthIns(e.target.checked)}
                                    className="accent-teal-500"
                                />
                                Health Insurance ( $ 25 )
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={medicalIns}
                                    onChange={(e) => setMedicalIns(e.target.checked)}
                                    className="accent-teal-500"
                                />
                                Medical Insurance ( $ 45 )
                            </label>
                        </div>

                        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition text-sm">
                            BOOK NOW FOR $ {total}
                        </button>
                    </div>
                </div>
            </div>

            {/* Packages */}
            <div className="bg-gray-50 py-14 px-4">
                <div className="max-w-5xl mx-auto">
                    <p className="text-center text-xs text-teal-500 font-semibold tracking-widest uppercase mb-1">CHECK IT</p>
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Packages</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tourData.packages.map((pkg, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                <div className="relative h-44">
                                    {/* ✅ FIX: Next/Image needs fill or width/height */}
                                    <Image src={pkg.img} alt={pkg.name} fill className="object-cover" />
                                    <span className="absolute top-3 right-3 bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
                                        {pkg.weeks} Week{pkg.weeks > 1 ? "s" : ""}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-gray-900 text-lg">{pkg.name}</h3>
                                    <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">📍 {pkg.location}</p>
                                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">{pkg.desc}</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-gray-400">From</span>
                                            <p className="text-xl font-bold text-gray-900">$ {pkg.price}</p>
                                        </div>
                                        <button className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* NOTE:
              If Unsplash images still don't load, add images.remotePatterns for images.unsplash.com in next.config.js
          */}
                </div>
            </div>
        </div>
    )
}