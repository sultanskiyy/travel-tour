import Image from "next/image";
import Link from "next/link";
import { Clock3, MapPin, Mail, Share2 } from "lucide-react";
import type { PackageType } from "@/types/PackageTypes";
import {
  applyFilters,
  getDurationLabel,
  type SearchParamsType,
} from "@/components/ApplyFilter";

type Props = {
  searchParams: Promise<SearchParamsType>;
  packages: PackageType[];
};

const ITEMS_PER_PAGE = 6;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80";

const getSafeImage = (src?: string) => {
  if (!src || src === "string") return FALLBACK_IMAGE;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return FALLBACK_IMAGE;
};

function getFirst(value?: string | string[]) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function TourCardsSarch({
  searchParams,
  packages,
}: Props) {
  const sp = await searchParams;

  const filteredTours = applyFilters(packages, sp);

  const currentPage = Math.max(1, Number(sp.page || "1"));
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTours.length / ITEMS_PER_PAGE),
  );

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;

  const paginatedTours = filteredTours.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const createPageLink = (page: number) => {
    const params = new URLSearchParams();

    if (sp.search) params.set("search", getFirst(sp.search));
    if (sp.location) params.set("location", getFirst(sp.location));
    if (sp.destination) params.set("destination", getFirst(sp.destination));
    if (sp.date) params.set("date", getFirst(sp.date));
    if (sp.minPrice) params.set("minPrice", getFirst(sp.minPrice));
    if (sp.maxPrice) params.set("maxPrice", getFirst(sp.maxPrice));
    if (sp.onlyPromo) params.set("onlyPromo", getFirst(sp.onlyPromo));

    const appendArray = (key: string, value?: string | string[]) => {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    };

    appendArray("typology", sp.typology);
    appendArray("duration", sp.duration);
    appendArray("difficulty", sp.difficulty);
    appendArray("minAge", sp.minAge);

    params.set("page", String(page));

    return `/search?${params.toString()}`;
  };

  return (
    <section className="min-w-0 w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">All Tours</h2>
        <p className="text-sm text-gray-500">
          {filteredTours.length} results found
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {paginatedTours.map((tour) => (
          <div
            key={tour.id}
            className="overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="relative h-55 w-full bg-gray-200">
              <Image
                src={getSafeImage(tour.cover_image)}
                alt={tour.title_uz || "tour"}
                fill
                className="object-cover"
              />

              {tour.is_promotion && (
                <span className="absolute right-3 top-3 rounded-full bg-rose-400 px-3 py-1 text-[10px] font-semibold tracking-wide text-white">
                  SALE
                </span>
              )}
            </div>

            <div className="px-4 pb-4 pt-4">
              <div className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 text-[12px] text-gray-400 shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{getDurationLabel(tour)}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-3.5 w-3.5 text-emerald-400" />
                  <Share2 className="h-3.5 w-3.5 text-emerald-400" />
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <h3 className="text-[20px] font-bold text-black">
                {tour.title_uz || "Untitled tour"}
              </h3>

              <div className="mt-1 flex items-center gap-1 text-[13px] text-gray-400">
                <MapPin className="h-3.5 w-3.5 text-rose-400" />
                <span>{tour.departure_city || "Unknown location"}</span>
              </div>

              <p className="mt-5 min-h-24 text-[13px] leading-6 text-gray-400">
                {tour.description_uz || tour.description || "No description"}
              </p>

              <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-5">
                <Link
                  href={`/single?id=${tour.id}`}
                  className="rounded bg-emerald-500 px-5 py-2 text-[12px] font-semibold text-white"
                >
                  Details
                </Link>

                <div className="text-right">
                  <p className="text-[12px] text-gray-400">From</p>
                  <div className="flex items-end gap-1">
                    <span className="text-[30px] font-bold leading-none text-black">
                      ${tour.total_price ?? 0}
                    </span>
                    {tour.original_price && (
                      <span className="mb-1 text-[12px] text-gray-400 line-through">
                        ${tour.original_price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {paginatedTours.length === 0 && (
          <div className="col-span-full rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            No tours found
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = page === safePage;

            return (
              <Link
                key={page}
                href={createPageLink(page)}
                scroll={false}
                className={`flex h-9 w-9 items-center justify-center rounded text-sm font-medium ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-800"
                }`}
              >
                {page}
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
