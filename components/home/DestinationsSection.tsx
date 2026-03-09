import Container from "@/components/Container";
import Link from "next/link";
import Image from "next/image";

const destinations = [
  {
    name: "Greece",
    img: "/greece.jpg",
    desc: "Experience the ancient history & beaches",
  },
  {
    name: "Egypt",
    img: "/egypt.jpg",
    desc: "Discover the land of pharaohs & pyramids",
  },
  {
    name: "Africa",
    img: "/africa.jpg",
    desc: "Embark on a journey for your lifetime",
  },
  {
    name: "France",
    img: "/france.jpg",
    desc: "Indulge in art, culture, and cuisine",
  },
];

const DestinationsSection = () => {
  return (
    <section className="bg-gray-100 py-24">
      <Container className="px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="max-w-xl">
            <p className="text-emerald-500 text-sm mb-3">Next Adventure</p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Travel Destinations <br /> Available Worldwide
            </h2>

            <p className="text-gray-500 text-sm mt-4 leading-6">
              We have compiled a list of top destinations across the globe,
              scoured the world for the most alluring and fascinating places
              to visit. From the beautiful beaches of the Caribbean to the
              majestic mountains of Europe and the vibrant cities of Asia, our
              destination list has something for everyone.
            </p>
          </div>

          <div className="hidden lg:block" />
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((item) => (
            <Link
              key={item.name}
              href={`/destination/${item.name.toLowerCase()}`}
              className="group relative h-90 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/80 transition" />

              <div className="absolute bottom-8 left-0 right-0 px-4 text-center text-white">
                <h3 className="text-2xl font-extrabold drop-shadow">
                  {item.name}
                </h3>

                <p className="mt-3 text-sm leading-5 opacity-95 drop-shadow max-w-55 mx-auto">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DestinationsSection;