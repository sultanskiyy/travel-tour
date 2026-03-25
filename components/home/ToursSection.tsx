import Image from "next/image";
import Link from "next/link";
import type { PackageType } from "@/types/PackageTypes";
import getData from "@/service/api";

function getDurationLabel(item: PackageType): string {
  if (item.duration_label) return item.duration_label;
  if (typeof item.duration_days === "number")
    return `${item.duration_days} Days`;
  return "Unknown duration";
}

function getPrice(value?: number | string) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value) || 0;
  return 0;
}

export default async function ToursSection() {
  const response = await getData({ url: "package" }).catch(() => []);
  const packages: PackageType[] = Array.isArray(response) ? response : [];

  const visiblePackages = packages.slice(0, 3);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visiblePackages.map((item, index) => (
            <div
              key={item.id ?? index}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="relative h-[220px] w-full">
                <Image
                  src={item.cover_image || "/placeholder.png"}
                  alt={item.title_uz || "tour image"}
                  fill
                  className="object-cover"
                />

                {item.is_promotion && (
                  <span className="absolute right-4 top-4 rounded-full bg-purple-400 px-3 py-1 text-[10px] font-semibold text-white">
                    SALE
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="mb-4 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500">
                  <span>{getDurationLabel(item)}</span>
                  <span>✉️ ↗</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {item.title_uz || "Untitled"}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  📍 {item.departure_city || "Unknown"}
                </p>

                <p className="mt-4 min-h-[72px] text-sm leading-6 text-gray-500">
                  {item.description_uz || item.description || "No description"}
                </p>

                <div className="mt-6 flex items-end justify-between border-t pt-5">
                  <Link
                    href={`/single?id=${item.id}`}
                    className="rounded bg-teal-400 px-5 py-2 text-sm font-medium text-white"
                  >
                    Details
                  </Link>

                  <div className="text-right">
                    <p className="text-sm text-gray-400">From</p>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold text-black">
                        ${getPrice(item.total_price)}
                      </span>
                      {item.original_price ? (
                        <span className="mb-1 text-xs text-gray-400 line-through">
                          ${getPrice(item.original_price)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
