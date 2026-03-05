import getData from "@/service/api"
import type { CategoryType } from "@/types/CategoryType"
import type { TourCardType } from "@/types/TourCardType"
import { useTours } from "@/hooks/useTours"

import Container from "@/components/Container"
import Link from "next/link"
import Image from "next/image"
import { FaSearch, FaMapMarkerAlt, FaGlobe, FaCheck } from "react-icons/fa"

const HomePage = async () => {
  const categories: CategoryType[] = await getData({ url: "category" })
  const tours: TourCardType[] = useTours()

  return (
    <>
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

              <Link href="./search/page.tsx" className="bg-emerald-500 flex items-center justify-center cursor-pointer hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-md">
                SEARCH
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <Container className="px-9">
          <div className="max-w-130 pb-10">
            <p className="text-emerald-500 font-medium text-sm mb-2">
              Dream Vacation Destination
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-black">
              Plan the Trip of a Lifetime <br /> with Ease
            </h2>

            <p className="mt-5 text-sm text-gray-500 leading-6">
              Whether you are looking for a romantic getaway, a family-friendly
              adventure, or a solo journey to explore the world, a travel agency can
              provide you with a custom-tailored itinerary that exceeds your expectations.
            </p>

            <button className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-md transition">
              More Info
            </button>
          </div>
        </Container>

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

        <Container className="mt-14 px-8">
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

                  <div className="p-6">
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

                    <div className="pt-5">
                      <div className="h-px w-full bg-gray-200" />

                      <div className="mt-4 flex items-end justify-between">
                        <Link
                          href={`/single`}
                          className={`px-5 cursor-pointer py-2 rounded-md text-white text-sm font-semibold ${accentBtn}`}
                        >
                          Details
                        </Link>

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
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-gray-100 py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-emerald-500 text-sm mb-3">Choose your Trip</p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Start your Vacation Now
            </h2>

            <p className="text-gray-500 text-sm mt-4 leading-6">
              Looking for your dream vacation destination but don’t know where to
              start? With the help <br /> of experienced and knowledgeable travel agents,
              you can plan the trip of a lifetime with ease.
            </p>
          </div>

          <div className="mt-10 max-w-4xl mx-auto bg-white rounded-xl shadow-md p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-6">

              <div className="flex items-center gap-3 cursor-pointer">
                <FaSearch className="text-orange-500 text-lg" />
                <div>
                  <p className="text-xs font-semibold text-gray-700">Search</p>
                  <p className="text-xs text-gray-400">Insert keyword</p>
                </div>
              </div>

              <div className="flex items-center gap-3 cursor-pointer">
                <FaMapMarkerAlt className="text-orange-500 text-lg" />
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    Destinations
                  </p>
                  <p className="text-xs text-gray-400">All Destinations</p>
                </div>
              </div>

              <div className="flex items-center gap-3 cursor-pointer">
                <FaGlobe className="text-orange-500 text-lg" />
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    Typologies
                  </p>
                  <p className="text-xs text-gray-400">All Typologies</p>
                </div>
              </div>

              <Link href="./search/page" className="bg-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-md">
                SEARCH
              </Link>

            </div>
          </div>
        </Container>
      </section>

      <section className="bg-gray-100 py-24">
        <Container className="px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="max-w-xl">
              <p className="text-emerald-500 text-sm mb-3">Next Adventure</p>

              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Travel Destinations <br /> Available Worldwide
              </h2>

              <p className="text-gray-500 text-sm mt-4 leading-6">
                We have compiled a list of top destinations across the globe, scoured
                the world for the most alluring and fascinating places to visit. From
                the beautiful beaches of the Caribbean to the majestic mountains of
                Europe and the vibrant cities of Asia, our destination list has
                something for everyone.
              </p>
            </div>

            <div className="hidden lg:block" />
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Greece",
                img: "/greece.jpg",
                desc: "Experience the ancient history & beaches",
              },
              {
                name: "Egypt",
                img: "/egypt.jpg",
                desc: "Discover the land of pharaohs & pyramids",
              },
              {
                name: "Africa",
                img: "/africa.jpg",
                desc: "Embark on a journey for your lifetime",
              },
              {
                name: "France",
                img: "/france.jpg",
                desc: "Indulge in art, culture, and cuisine",
              },
            ].map((item) => (
              <Link
                key={item.name}
                href={`/destination/${item.name.toLowerCase()}`}
                className="group relative h-[360px] rounded-2xl overflow-hidden cursor-pointer
                     shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/80 transition" />

                {/* TEXT (rasmdagidek pastda center) */}
                <div className="absolute bottom-8 left-0 right-0 px-4 text-center text-white">
                  <h3 className="text-2xl font-extrabold drop-shadow">
                    {item.name}
                  </h3>

                  <p className="mt-3 text-sm leading-5 opacity-95 drop-shadow max-w-[220px] mx-auto">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-gradient-to-r from-white via-gray-300 to-black/75">
        <div className="max-w-330 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          <div className="relative w-full max-w-md mx-auto lg:mx-0 h-[420px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/ormon.png"
              alt="Adventure Travel"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-black md:text-white max-w-lg">

            <p className="text-sm text-black/70 md:text-white/80 mb-3 tracking-wide">
              Adventure Travel
            </p>

            <h2 className="text-4xl font-extrabold leading-tight">
              Embrace the Thrill of <br /> the Unknown
            </h2>

            <p className="text-sm text-black/70 md:text-white/80 mt-5 leading-6">
              Are you tired of the typical tourist destinations and looking to step
              out of your comfort zone? Adventure travel may be the perfect solution
              for you! Here are four reasons why you should book an adventure travel
              experience.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3 border-b border-black/20 md:border-white/20 pb-3">
                <FaCheck className="text-emerald-400 text-sm" />
                <span className="text-sm">Connect with nature</span>
              </div>

              <div className="flex items-center gap-3 border-b border-black/20 md:border-white/20 pb-3">
                <FaCheck className="text-emerald-400 text-sm" />
                <span className="text-sm">Experience other cultures</span>
              </div>

              <div className="flex items-center gap-3 border-b border-black/20 md:border-white/20 pb-3">
                <FaCheck className="text-emerald-400 text-sm" />
                <span className="text-sm">Create unforgettable memories</span>
              </div>

            </div>

            <button className="mt-8 bg-emerald-500 hover:bg-emerald-600 transition text-white text-sm font-semibold px-6 py-3 rounded-md">
              All Services
            </button>

          </div>

        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-330 mx-auto px-6 text-center">

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12">
            Travel Itineraries
          </h2>

          <div className="relative w-full h-105 md:h-125 rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/v1EelA5RgW4?si=ZsmWuHFCk-R5mkGT"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-10 items-center opacity-70">

            <div className="flex justify-center grayscale hover:grayscale-0 transition">
              <Image
                src="/logo1.png"
                alt="partner"
                width={150}
                height={60}
              />
            </div>

            <div className="flex justify-center grayscale hover:grayscale-0 transition">
              <Image
                src="/logo2.png"
                alt="partner"
                width={150}
                height={60}
              />
            </div>

            <div className="flex justify-center grayscale hover:grayscale-0 transition">
              <Image
                src="/logo3.png"
                alt="partner"
                width={150}
                height={60}
              />
            </div>

            <div className="flex justify-center grayscale hover:grayscale-0 transition">
              <Image
                src="/logo4.png"
                alt="partner"
                width={150}
                height={60}
              />
            </div>

            <div className="">
              <Image
                src="/logo5.png"
                alt="partner"
                width={150}
                height={40}
              />
            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export default HomePage