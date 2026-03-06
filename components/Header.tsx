"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
    const [open, setOpen] = useState(false)

    // Desktopga o'tganda mobile menuni avtomatik yopish
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setOpen(false)
        }
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-white border-b">
            <div className="max-w-330 mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between md:grid md:grid-cols-3 md:items-center py-4">
                    <div className="flex items-center">
                        <Link href="/" className="inline-flex items-center">
                            <Image
                                src="/logo.png"
                                alt="Love Travel"
                                width={140}
                                height={40}
                                priority
                                className="h-auto w-30 sm:w-35"
                            />
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center justify-center gap-6 text-sm text-gray-600 whitespace-nowrap">
                        <Link href="/" className="hover:text-emerald-500 transition">
                            Home
                        </Link>
                        <span className="text-emerald-400">:</span>

                        <Link href="/travel" className="hover:text-emerald-500 transition">
                            Travel
                        </Link>
                        <span className="text-emerald-400">:</span>

                        <Link href="/pages" className="hover:text-emerald-500 transition">
                            Pages
                        </Link>
                        <span className="text-emerald-400">:</span>

                        <Link href="/shop" className="hover:text-emerald-500 transition">
                            Shop
                        </Link>
                        <span className="text-emerald-400">:</span>

                        <Link href="/blog" className="hover:text-emerald-500 transition">
                            Blog
                        </Link>
                        <span className="text-emerald-400">:</span>

                        <Link href="/contactus" className="hover:text-emerald-500 transition">
                            Contact Us
                        </Link>
                    </nav>

                    <div className="flex items-center justify-end gap-3 sm:gap-4">
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="text-gray-700 cursor-pointer md:hidden focus:outline-none inline-flex items-center justify-center w-10 h-10"
                            aria-label="Toggle menu"
                            aria-expanded={open}
                        >
                            {open ? <X size={22} /> : <Menu size={22} />}
                        </button>

                        <button className="bg-emerald-500 cursor-pointer text-white px-4 sm:px-5 py-2 rounded-md text-sm hover:bg-emerald-600 transition">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden overflow-hidden border-t bg-white transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"
                    }`}
            >
                <div className="px-6 py-4 space-y-4 text-sm text-gray-700">
                    <Link onClick={() => setOpen(false)} href="/" className="block">
                        Home
                    </Link>
                    <Link onClick={() => setOpen(false)} href="/travel" className="block">
                        Travel
                    </Link>
                    <Link onClick={() => setOpen(false)} href="/pages" className="block">
                        Pages
                    </Link>
                    <Link onClick={() => setOpen(false)} href="/shop" className="block">
                        Shop
                    </Link>
                    <Link onClick={() => setOpen(false)} href="/blog" className="block">
                        Blog
                    </Link>
                    <Link onClick={() => setOpen(false)} href="/contact" className="block">
                        Contact Us
                    </Link>
                </div>
            </div>
        </header>
    )
}