import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa"

export default function Footer() {
    return (
        <footer>
            <section
                className="relative w-full min-h-95 md:h-95 bg-cover bg-position-[70%_center] md:bg-center"
                style={{ backgroundImage: "url('/overlay.png')" }}
            >
                <div className="absolute inset-0 bg-black/65" />

                <div className="relative max-w-330 mx-auto h-full px-6 py-12 md:py-0">
                    <div className="h-full grid grid-cols-1 md:grid-cols-3 items-center gap-10 text-white">
                        <div className="md:pr-10">
                            <h2 className="text-[30px] md:text-[30px] font-extrabold leading-[1.65]">
                                Travel beyond your <br /> imagination, with our Travel Agency!
                            </h2>
                        </div>

                        <div className="md:justify-self-center">
                            <h3 className="text-sm font-bold mb-4">Address</h3>

                            <ul className="space-y-2 text-[12px] text-white/85">
                                <li>1080 Brickell Ave</li>
                                <li>Miami - Florida</li>
                                <li>U.S. of America</li>
                            </ul>

                            <div className="flex items-center gap-4 mt-6 text-white">
                                <a href="#" aria-label="Facebook" className="opacity-90 hover:opacity-100 transition">
                                    <FaFacebookF size={14} />
                                </a>
                                <a href="#" aria-label="Twitter" className="opacity-90 hover:opacity-100 transition">
                                    <FaTwitter size={14} />
                                </a>
                                <a href="#" aria-label="YouTube" className="opacity-90 hover:opacity-100 transition">
                                    <FaYoutube size={14} />
                                </a>
                            </div>
                        </div>

                        <div className="md:justify-self-end">
                            <h3 className="text-sm font-bold mb-4">Contact</h3>

                            <button className="inline-flex cursor-pointer items-center justify-center px-5 py-2 rounded-md bg-emerald-500 text-[11px] font-semibold">
                                info@travel.com
                            </button>

                            <p className="mt-5 text-[16px] hover:text-emerald-500 cursor-pointer duration-300 font-extrabold whitespace-nowrap">
                                + 01 483 593 284
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}
