import Container from "@/components/Container";
import Link from "next/link";
import { FaSearch, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section
      className="relative mt-17 w-full min-h-130 md:min-h-162.5 bg-cover bg-center bg-no-repeat flex items-center"
      style={{ backgroundImage: "url('/Travel-Rule-Compliance.webp')" }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <Container className="relative z-10 w-full px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="flex flex-col items-start">
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
                    <p className="text-xs font-semibold text-gray-700">
                      Typologies
                    </p>
                    <p className="text-xs text-gray-400">All Typologies</p>
                  </div>
                </div>

                <Link
                  href="/search"
                  className="bg-emerald-500 flex items-center justify-center cursor-pointer hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-md"
                >
                  SEARCH
                </Link>
              </div>
            </div>
          </div>
          <div className="md:flex-1" />
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;