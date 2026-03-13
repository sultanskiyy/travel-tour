import Container from "@/components/Container";
import type { CategoryType } from "@/types/CategoryType";
import Link from "next/link";
import Image from "next/image";

type Props = {
  categories: CategoryType[];
};

const CategoryToursSection = ({ categories = [] }: Props) => {
  return (
    <section className="py-16">
      <Container className="px-9">
        <div className="max-w-130 pb-10">
          <p className="text-emerald-500 font-medium text-sm mb-2">
            Dream Vacation Destinations
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-black">
            Plan the Trip of a Lifetime <br /> with Ease
          </h2>

          <p className="mt-5 text-sm text-gray-500 leading-6">
            Whether you are looking for a romantic getaway, a family-friendly
            adventure, or a solo journey to explore the world, a travel agency
            can provide you with a custom-tailored itinerary that exceeds your
            expectations.
          </p>

          <button className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-md transition">
            More Info
          </button>
        </div>
      </Container>

      <Container className="px-9">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          {categories
            .filter((el) => {
              return (
                typeof el.icon === "string" &&
                el.icon &&
                el.icon.trim() !== "" &&
                (el.icon.startsWith("http://") || el.icon.startsWith("https://"))
              );
            })
            .map((el) => (
              <div
                key={el.id}
                className="relative w-full h-[120px] rounded-xl overflow-hidden group cursor-pointer"
              >
                <Link
                  href={`/category/${el.id}`}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <span className="relative z-10 text-white font-semibold text-lg drop-shadow-lg">
                    {el.name_uz}
                  </span>
                </Link>

                <Image
                  fill
                  src={el.icon as string}
                  alt={el.name_uz || "Category"}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 90vw, 360px"
                  priority={false}
                  onError={(result) => {
                    result.target.src = "/placeholder.jpg";
                  }}
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoryToursSection;