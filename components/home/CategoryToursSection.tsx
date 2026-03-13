import Container from "@/components/Container";
import type { CategoryType } from "@/types/CategoryType";
import Link from "next/link";
import Image from "next/image";

type Props = {
  categories: CategoryType[];
};

const CategoryToursSection = ({ categories = [] }: Props) => {
  const validCategories = categories.filter(
    (el) =>
      el &&
      typeof el.id !== "undefined" &&
      typeof el.name_uz === "string" &&
      typeof el.icon === "string" &&
      el.icon.trim() !== "" &&
      /^https?:\/\//.test(el.icon),
  );

  return (
    <section className="py-16">
      <Container className="px-9">
        <div className="max-w-[520px] pb-10">
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

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          {validCategories.map((el) => (
            <Link
              key={el.id}
              href={`/category/${el.id}`}
              className="relative w-full max-w-[360px] h-[120px] rounded-xl overflow-hidden flex items-center justify-center"
            >
              <Image
                fill
                src={el.icon || "/placeholder.jpg"}
                alt={el.name_uz || "category image"}
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 360px"
              />
              <div className="absolute inset-0 bg-black/30" />
              <span className="relative z-10 text-white font-semibold text-lg">
                {el.name_uz}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoryToursSection;
