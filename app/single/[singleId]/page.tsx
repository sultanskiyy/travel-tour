"use client"

import Image from "next/image"
import { use, useEffect, useState } from "react"
import { CiMapPin } from "react-icons/ci"
import { FaMapSigns } from "react-icons/fa"
import { GoClock } from "react-icons/go"
import { MdOutlineMan } from "react-icons/md"
import getData from "@/service/api"

type Tour = {
    id: string
    title: string
    title_uz: string
    description: string
    includes: string[]
    excludes: string[]
    itinerary: string
    duration_days: number
    duration_nights: number
    difficulty: string
    base_price: number
    currency: string
    discount_pct: number
    cover_image: string
    meeting_point: string
    meeting_lat: number
    meeting_lng: number
    min_people: number
    max_people: number
}

export default function TourPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [tour, setTour] = useState<Tour | null>(null)
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)
    const [healthIns, setHealthIns] = useState(false)
    const [medicalIns, setMedicalIns] = useState(false)

    useEffect(() => {
        getData({ url: `tour/${id}` }).then((data) => {
            setTour(data as Tour)
        })
    }, [id])
    if (!tour) return <div className="flex items-center justify-center h-96 text-gray-400">Loading...</div>

    const total = tour.base_price * adults + (healthIns ? 25 : 0) + (medicalIns ? 45 : 0)

    return (
        <div className="bg-white font-sans text-gray-800">
            {/* Hero */}
            <div className="relative w-full h-64 md:h-96 overflow-hidden">
                <Image
                    src={tour.cover_image || "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=80"}
                    alt={tour.title_uz}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>

            {/* Tour Meta */}
            <div className="mx-auto px-4 py-6 flex flex-wrap items-center gap-6 border-b border-gray-200">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{tour.title_uz || tour.title}</h1>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <CiMapPin className="text-white bg-black rounded-2xl h-5 w-5 p-0.5" />
                        {tour.meeting_point}
                    </p>
                </div>
                <div className="flex gap-6 ml-auto flex-wrap">
                    {[
                        { icon: <GoClock />, label: `${tour.duration_days} Days`, sub: "" },
                        { icon: <FaMapSigns />, label: tour.difficulty, sub: "Difficulty" },
                        { icon: <MdOutlineMan />, label: "Min People", sub: String(tour.min_people) },
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
                    <section className="mb-10">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Enjoy the Adventure</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">{tour.description}</p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Included / Excluded</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                {tour.includes?.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                                        <span className="text-green-500">✓</span> {item}
                                    </div>
                                ))}
                            </div>
                            <div>
                                {tour.excludes?.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                                        <span className="text-red-400">✗</span> {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Map */}
                    {tour.meeting_lat && tour.meeting_lng && (
                        <section className="mb-10">
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Tour Map</h2>
                            <div className="rounded-xl overflow-hidden border border-gray-200 h-56">
                                <iframe
                                    title="Tour Map"
                                    src={`https://maps.google.com/maps?q=${tour.meeting_lat},${tour.meeting_lng}&z=12&output=embed`}
                                    className="w-full h-full"
                                    loading="lazy"
                                />
                            </div>
                        </section>
                    )}

                    {/* Itinerary */}
                    {tour.itinerary && (
                        <section className="mb-10">
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Itinerary</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">{tour.itinerary}</p>
                        </section>
                    )}
                </div>

                {/* Right: Booking */}
                <div className="w-full lg:w-80 shrink-0">
                    <div className="sticky top-6 rounded-2xl border border-gray-200 shadow-lg p-6">
                        <p className="text-xs text-gray-400 mb-1">Price</p>
                        <p className="text-3xl font-bold text-gray-900 mb-4">
                            From <span className="text-teal-500">{tour.base_price} {tour.currency}</span>
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
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                            />
                        </div>

                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="text-sm font-semibold">Adults</p>
                                <p className="text-xs text-gray-400">Over 18</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">−</button>
                                <span className="w-6 text-center text-sm font-bold">{adults}</span>
                                <button onClick={() => setAdults(adults + 1)} className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <p className="text-sm font-semibold">Children</p>
                                <p className="text-xs text-gray-400">Under 18</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">−</button>
                                <span className="w-6 text-center text-sm font-bold">{children}</span>
                                <button onClick={() => setChildren(children + 1)} className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100">+</button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <p className="text-xs font-semibold text-gray-600 mb-2">Extra Services</p>
                            <label className="flex items-center gap-2 text-sm text-gray-600 mb-2 cursor-pointer">
                                <input type="checkbox" checked={healthIns} onChange={(e) => setHealthIns(e.target.checked)} className="accent-teal-500" />
                                Health Insurance ( $ 25 )
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                <input type="checkbox" checked={medicalIns} onChange={(e) => setMedicalIns(e.target.checked)} className="accent-teal-500" />
                                Medical Insurance ( $ 45 )
                            </label>
                        </div>

                        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition text-sm">
                            BOOK NOW FOR $ {total}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}