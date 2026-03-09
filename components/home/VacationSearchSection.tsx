import Container from "@/components/Container";
import Link from "next/link";
import { FaSearch, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";

const VacationSearchSection = () => {
  return (
    <section className="bg-gray-100 py-24">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-emerald-500 text-sm mb-3">Choose your Trip</p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Start your Vacation Now
          </h2>

          <p className="text-gray-500 text-sm mt-4 leading-6">
            Looking for your dream vacation destination but don’t know where
            to start? With the help <br /> of experienced and knowledgeable
            travel agents, you can plan the trip of a lifetime with ease.
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

            <Link
              href="/search/page"
              className="bg-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-md"
            >
              SEARCH
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VacationSearchSection;