"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
    const [open, setOpen] = useState(false)

    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-white border-b">
            <div className="max-w-300 mx-auto grid grid-cols-3 items-center py-4 px-6">

                {/* LOGO */}
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Love Travel"
                            width={140}
                            height={40}
                            priority
                        />
                    </Link>
                </div>

                {/* NAVIGATION */}
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

                    <Link href="/contact" className="hover:text-emerald-500 transition">
                        Contact Us
                    </Link>
                </nav>

                {/* RIGHT SIDE */}
                <div className="flex items-center justify-end gap-4">
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="text-gray-700 cursor-pointer md:hidden focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    <button className="bg-emerald-500 cursor-pointer text-white px-5 py-2 rounded-md text-sm hover:bg-emerald-600 transition">
                        Search
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 text-sm text-gray-700">
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
            )}
        </header>
    )
}