import getData from "@/service/api"
import type { CategoryType } from "@/types/CategoryType"
import type { TourCardType } from "@/types/TourCardType"
import { useTours } from "@/hooks/useTours"

import Container from "@/components/Container"
import Link from "next/link"
import Image from "next/image"
import { FaSearch, FaMapMarkerAlt, FaGlobe } from "react-icons/fa"

const HomePage = async () => {
  const categories: CategoryType[] = await getData({ url: "category" })
  const tours: TourCardType[] = useTours()

  return (
    <>
      {/* HERO */}
      <section
        className="relative mt-17 w-full min-h-130 md:min-h-162.5 bg-cover bg-center bg-no-repeat flex items-center"
        style={{ backgroundImage: "url('/Travel-Rule-Compliance.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-330 mx-auto w-full px-6">
          <p className="text-xs tracking-[0.25em] text-white/70 mb-4">
            LOVE TRAVEL THEME
          </p>

          <h1 className="text-[38px] md:text-[64px] font-extrabold leading-[1.05] text-white max-w-162.5">
            Adventure & Experience The Travel !
          </h1>

          <div className="mt-10 bg-white rounded-xl shadow-lg p-4 md:p-5 max-w-225">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-6">
              <div className="flex cursor-pointer items-center gap-3">
                <FaSearch className="text-emerald-500 text-lg" />
                <div>
                  <p className="text-xs font-semibold text-gray-700">Search</p>
                  <p className="text-xs text-gray-400">Insert keyword</p>
                </div>
              </div>

              <div className="flex cursor-pointer items-center gap-3">
                <FaMapMarkerAlt className="text-emerald-500 text-lg" />
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    Destinations
                  </p>
                  <p className="text-xs text-gray-400">All Destinations</p>
                </div>
              </div>

              <div className="flex cursor-pointer items-center gap-3">
                <FaGlobe className="text-emerald-500 text-lg" />
                <div>
                  <p className="text-xs font-semibold text-gray-700">Typologies</p>
                  <p className="text-xs text-gray-400">All Typologies</p>
                </div>
              </div>

              <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-md">
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="py-16">
        {/* TEXT BLOCK */}
        <Container className="px-9">
          <div className="max-w-130 pb-10">
            <p className="text-emerald-500 font-medium text-sm mb-2">
              Dream Vacation Destination
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-black">
              Plan the Trip of a Lifetime <br /> with Ease
            </h2>

            <p className="mt-5 text-sm text-gray-500 leading-6">
              Whether you&apos;re looking for a romantic getaway, a family-friendly
              adventure, or a solo journey to explore the world, a travel agency can
              provide you with a custom-tailored itinerary that exceeds your expectations.
            </p>

            <button className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-md transition">
              More Info
            </button>
          </div>
        </Container>

        {/* CATEGORIES (faqat valid icon url) */}
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
            {categories
              ?.filter((el: CategoryType) => {
                return (
                  typeof el.icon === "string" &&
                  el.icon !== "string" &&
                  (el.icon.startsWith("http://") || el.icon.startsWith("https://"))
                )
              })
              .map((el: CategoryType) => (
                <Link
                  key={el.id}
                  href={`/category/${el.id}`}
                  className="relative w-full max-w-90 h-30 rounded-xl overflow-hidden flex items-center justify-center"
                >
                  <Image
                    fill
                    src={el.icon}
                    alt={el.name_uz}
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 360px"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="relative z-10 text-white font-semibold text-lg">
                    {el.name_uz}
                  </span>
                </Link>
              ))}
          </div>
        </Container>

        {/* TOURS (useTours dan keladi) */}
        <Container className="mt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tours.map((tour) => {
              const accentBtn =
                tour.accent === "green"
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : tour.accent === "cyan"
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "bg-violet-500 hover:bg-violet-600"

              const accentDot =
                tour.accent === "green"
                  ? "bg-emerald-500"
                  : tour.accent === "cyan"
                    ? "bg-cyan-500"
                    : "bg-violet-500"

              return (
                <div
                  key={tour.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  {/* image */}
                  <div className="relative w-full h-50">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 420px"
                    />

                    {tour.sale && (
                      <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                        SALE
                      </span>
                    )}
                  </div>

                  {/* body */}
                  <div className="p-6">
                    {/* days */}
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className={`w-2 h-2 rounded-full ${accentDot}`} />
                      <span>{tour.days}</span>
                    </div>

                    <h3 className="mt-4 text-[16px] font-extrabold text-gray-900">
                      {tour.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <FaMapMarkerAlt className="text-emerald-500" />
                      {tour.country}
                    </div>

                    {tour.description && (
                      <p className="mt-4 text-sm text-gray-500 leading-6">
                        {tour.description}
                      </p>
                    )}

                    {/* bottom 1:1 */}
                    <div className="pt-5">
                      <div className="h-px w-full bg-gray-200" />

                      <div className="mt-4 flex items-end justify-between">
                        <button
                          className={`px-5 py-2 rounded-md text-white text-sm font-semibold ${accentBtn}`}
                        >
                          Details
                        </button>

                        <div className="text-right leading-none">
                          <p className="text-xs text-gray-400 mb-2">From</p>

                          <div className="flex items-end justify-end gap-2">
                            <span className="text-lg font-extrabold text-gray-900">
                              ${tour.price}
                            </span>

                            {typeof tour.oldPrice === "number" && (
                              <span className="text-xs text-gray-400 line-through">
                                ${tour.oldPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* bottom end */}
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}

export default HomePage