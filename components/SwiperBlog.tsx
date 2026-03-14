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
import { CategoryType } from "@/types/CategoryType";

const SwiperBlog = () => {
    const [category, setCategory] = useState<CategoryType[]>([]);
    const progressCircle = useRef<SVGSVGElement | null>(null);
    const progressContent = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData({ url: "category" });
                setCategory(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Fetch error:", error);
                setCategory([]);
            }
        };

        fetchData();
    }, []);

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
        <div className="relative h-full w-full">
            <Swiper
                spaceBetween={30}
                centeredSlides
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="h-full w-full"
            >
                {category.map((item) => (
                    <SwiperSlide key={item.id} className="h-full">
                        <section className="h-full w-full">
                            <div className="relative h-full w-full overflow-hidden">
                                <Image
                                    src={item?.icon || "/placeholder.jpg"}
                                    alt={item?.name_uz || "Package image"}
                                    fill
                                    className="object-cover"
                                />

                                <div className="absolute inset-0 bg-black/20" />   
                            </div>
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="autoplay-progress">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20" />
                </svg>
                <span ref={progressContent}></span>
            </div>
        </div>
    );
};

export default SwiperBlog;
