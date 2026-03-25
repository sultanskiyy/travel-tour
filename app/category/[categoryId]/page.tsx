
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Tour = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  duration?: string;
  rating?: number;
  location?: string;
};

async function getTours(categoryId: string) {
  const res = await fetch(
    `https://x8ki-letl-twmt.n7.xano.io/api:qNrTfAaz/tours?category_id=${categoryId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const tours: Tour[] = await getTours(params.categoryId);

  return (
    <div className="bg-gray-50 mt-17 min-h-screen">

      {/* HERO */}
      <div className="relative h-[320px] w-full">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600"
          alt="Travel"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Explore Tours
          </h1>
        </div>
      </div>

      {/* TOURS */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold mb-10">
          Available Tours
        </h2>

        {tours.length === 0 && (
          <p className="text-gray-500">No tours available</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {tours.map((tour) => (
            <Link
              key={tour.id}
              href={`/tour/${tour.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >
              {/* IMAGE */}
              <div className="relative h-[220px] w-full overflow-hidden">

                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />

                {/* PRICE */}
                <div className="absolute top-4 left-4 bg-emerald-500 text-white text-sm px-3 py-1 rounded-md">
                  ${tour.price}
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h3 className="text-lg font-semibold group-hover:text-emerald-600 transition">
                  {tour.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {tour.description}
                </p>

                {/* INFO */}
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">

                  {tour.duration && (
                    <span>⏱ {tour.duration}</span>
                  )}

                  {tour.rating && (
                    <span>⭐ {tour.rating}</span>
                  )}

                </div>

                {/* BUTTON */}
                <button className="mt-5 w-full bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600 transition">
                  Book Now
                </button>

              </div>
            </Link>
          ))}

        </div>

      </div>
    </div>
  );
}
