import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import Container from "@/components/Container";

const AdventureSection = () => {
  return (
    <section className="py-24 bg-linear-to-r from-white via-gray-300 to-black/75">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="relative w-full max-w-md mx-auto lg:mx-0 h-105 rounded-lg overflow-hidden shadow-xl">
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
              Are you tired of the typical tourist destinations and looking to
              step out of your comfort zone? Adventure travel may be the perfect
              solution for you! Here are four reasons why you should book an
              adventure travel experience.
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
      </Container>
    </section>
  );
};

export default AdventureSection;