import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import type { TourCardType } from "@/types/TourCardType";

type Props = {
  tours: TourCardType[];
};

const ToursSection = ({ tours = [] }: Props) => {
  return (
    <section className="py-4">
      <Container className="mt-14 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => {
            const accentBtn =
              tour.accent === "green"
                ? "bg-emerald-500 hover:bg-emerald-600"
                : tour.accent === "cyan"
                ? "bg-cyan-500 hover:bg-cyan-600"
                : "bg-violet-500 hover:bg-violet-600";

            const accentDot =
              tour.accent === "green"
                ? "bg-emerald-500"
                : tour.accent === "cyan"
                ? "bg-cyan-500"
                : "bg-violet-500";

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
                        href="/single"
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
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ToursSection;