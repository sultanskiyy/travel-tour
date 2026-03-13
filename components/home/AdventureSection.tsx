// components/AdventureSection.tsx
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import Container from "@/components/Container";

const AdventureSection = () => {
  return (
    <section className="relative py-24 px-8 lg:px-32">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bgimg.jpg"
          alt="Background Adventure"
          fill
          className="object-cover object-center"
        />
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left Image */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0 h-105 rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/ormon.png"
              alt="Adventure Travel"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="text-white max-w-lg">
            <p className="text-sm text-white/80 mb-3 tracking-wide">
              Adventure Travel
            </p>

            <h2 className="text-4xl font-extrabold leading-tight">
              Embrace the Thrill of <br /> the Unknown
            </h2>

            <p className="text-sm text-white/80 mt-5 leading-6">
              Are you tired of the typical tourist destinations and looking to
              step out of your comfort zone? Adventure travel may be the perfect
              solution for you! Here are four reasons why you should book an
              adventure travel experience.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/20 pb-3">
                <FaCheck className="text-emerald-400 text-sm" />
                <span className="text-sm">Connect with nature</span>
              </div>

              <div className="flex items-center gap-3 border-b border-white/20 pb-3">
                <FaCheck className="text-emerald-400 text-sm" />
                <span className="text-sm">Experience other cultures</span>
              </div>

              <div className="flex items-center gap-3 border-b border-white/20 pb-3">
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
