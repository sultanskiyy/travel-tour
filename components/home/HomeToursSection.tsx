import Image from "next/image";
import Link from "next/link";
import getData from "@/service/api";
import type { PackageType } from "@/types/PackageTypes";

export const dynamic = "force-dynamic";

function toNumber(value?: number | string) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value) || 0;
  return 0;
}

function getDurationLabel(item: PackageType) {
  if (item.duration_label) return item.duration_label;
  if (typeof item.duration_days === "number") {
    return `${item.duration_days} Days`;
  }
  return "Unknown duration";
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80";

export default async function HomeToursSection() {
  let packages: PackageType[] = [];

  try {
    const response = await getData({ url: "package" });

    packages = Array.isArray(response)
      ? response.filter((item) => typeof item === "object" && item !== null)
      : [];

    console.log("[HomeToursSection] packages count:", packages.length);
  } catch (error) {
    console.error("[HomeToursSection] Package fetch error:", error);
  }

  const tours = packages.slice(0, 3);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        {tours.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            Tours topilmadi
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((item, index) => (
              <div
                key={item.id ?? index}
                className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <div className="relative h-[250px] w-full overflow-hidden">
                  <Image
                    src={item.cover_image || FALLBACK_IMAGE}
                    alt={item.title_uz || "tour image"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-6 flex items-center justify-between rounded-2xl bg-[#f8f8f8] px-5 py-4 text-sm text-gray-500">
                    <span>{getDurationLabel(item)}</span>
                    <div className="flex items-center gap-3">
                      <span>✉️</span>
                      <span>↗</span>
                    </div>
                  </div>

                  <h3 className="min-h-[96px] text-[28px] font-bold leading-[1.25] text-black">
                    {item.title_uz || "Untitled"}
                  </h3>

                  <p className="mt-3 text-base text-gray-500">
                    📍 {item.departure_city || "Unknown"}
                  </p>

                  <p className="mt-5 min-h-[96px] text-[17px] leading-8 text-gray-500">
                    {item.description_uz ||
                      item.description ||
                      "No description"}
                  </p>

                  <div className="mt-auto border-t border-gray-200 pt-8">
                    <div className="flex items-end justify-between">
                      <Link
                        href={`/single?id=${item.id}`}
                        className="rounded-md bg-[#22c7b8] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#18b3a5]"
                      >
                        Details
                      </Link>

                      <div className="text-right">
                        <p className="mb-2 text-[16px] text-gray-400">From</p>
                        <div className="flex items-end gap-2">
                          <span className="text-[46px] font-bold leading-none text-black">
                            ${toNumber(item.total_price)}
                          </span>
                          {item.original_price ? (
                            <span className="mb-1 text-sm text-gray-400 line-through">
                              ${toNumber(item.original_price)}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
