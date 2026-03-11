"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../app/searchsweger.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import getData from "@/service/api";
import Image from "next/image";
import { PackageType } from "@/types/PackageTypes";


const Searchsweger = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData({ url: "package" });
            console.log(data);
            setCategory(data);
        };

        fetchData();
    }, []);

    const progressCircle = useRef<SVGSVGElement | null>(null);
    const progressContent = useRef<HTMLSpanElement | null>(null);

    const onAutoplayTimeLeft = (
        _swiper: SwiperType,
        time: number,
        progress: number
    ) => {
        if (progressCircle.current) {
            progressCircle.current.style.setProperty(
                "--progress",
                String(1 - progress)
            );
        }

        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
        >
            {category?.map((item:PackageType) => (
                <SwiperSlide key={item?.id}>
                    <section className="w-full bg-white">
                        <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
                            <Image
                                src={item?.cover_image}                           
                                     alt={item?.title}
                                fill
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-black/20" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <h1 className="text-white text-3xl md:text-6xl font-bold text-center">
                                    Our Packages
                                </h1>
                            </div>

                            <div className="absolute bottom-6 left-8 md:left-14 flex items-center gap-6 text-white uppercase tracking-[3px] text-[11px] md:text-sm">
                                <button className="flex items-center gap-2 hover:text-teal-300 transition">
                                    Price
                                    <span className="text-[10px]">▼</span>
                                </button>

                                <button className="flex items-center gap-2 hover:text-teal-300 transition">
                                    Name
                                    <span className="text-[10px]">▼</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>
            ))}

            <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20" />
                </svg>
                <span ref={progressContent}></span>
            </div>
        </Swiper>
    );
};

export default Searchsweger;