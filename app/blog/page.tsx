import Image from "next/image";
import LatestArticleCard from "@/components/LatestArticleCard";
import SwiperBlog from "@/components/SwiperBlog";
import Container from "@/components/Container";
import getData from "@/service/api";
import { CategoryType } from "@/types/CategoryType";

export const revalidate = 60;

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&q=80";

const AUTHOR_AVATAR = "https://i.pravatar.cc/80?img=12";
const FALLBACK_IMAGE = "/no-image.png";

function safeText(value?: string | null, fallback = "") {
  if (!value) return fallback;
  const text = value.trim();
  return text.length ? text : fallback;
}

export default async function Page() {
  const categories =
    (await getData<CategoryType[]>({
      url: "category",
    }).catch(() => [])) || [];

  const galleryImages = categories.slice(3, 5);
  const latestArticles = categories.slice(0, 3);

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-22.5 md:pt-24 md:pb-32.5 lg:pt-28 lg:pb-40">
        {/* background image */}
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=2000&q=80"
          alt="Blog background"
          fill
          priority
          className="object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <Container className="relative z-10 px-9">
          <div className="flex min-h-55 flex-col items-center justify-center text-center md:min-h-70 lg:min-h-80">
            <h1 className="text-[34px] font-extrabold tracking-[-0.04em] text-white md:text-[48px] lg:text-[58px]">
              Plan the Perfect Vacation
            </h1>

            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 md:text-[12px]">
              Apr 7 2023
            </p>

            <div className="mt-7 flex justify-center">
              <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#20c4a6] shadow-[0_10px_24px_rgba(32,196,166,0.25)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="h-4 w-4 text-white"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* FLOAT IMAGE */}
      <section className="relative z-10 -mt-13.75 md:-mt-21.25 lg:-mt-26.25">
        <Container className="px-9">
          <div className="overflow-hidden rounded-[10px] shadow-[0_22px_55px_rgba(15,23,42,0.10)]">
            <div className="relative aspect-1920/613 w-full">
              <Image
                src={HERO_IMAGE}
                alt="Vacation hero"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* CONTENT */}
      <section className="pb-16 pt-10">
        <Container className="px-9">
          <article className="space-y-8">
            {/* INTRO */}
            <div className="space-y-4 text-[11px] leading-[1.95] text-zinc-500 md:text-[12px]">
              <p>
                There are so many places to explore, so many adventures waiting
                for you. What makes a great travel destination? It depends on
                what kind of traveler you are: whether
                <br /> it is culture, natural beauty or history that interests
                you most; whether your idea of fun is hiking through mountains
                or lounging on white-sand beaches; if food is more
                <br /> important than sights when planning an itinerary (and
                vice versa).
              </p>

              <p>
                IThere are also practical considerations like cost and time
                spent traveling from place to place and maybe even how much
                luggage space there is in the car/plane/train
                <br /> compartment where well be sleeping tonight! But no
                matter what kind of traveler they are or what they are looking
                for out of their next trip abroad, everyone should <br />{" "}
                consider many factors before booking their flight(s).
              </p>
            </div>

            {/* QUOTE */}
            <div className="rounded-lg bg-[#f7f7f7] px-6 py-7 text-center md:px-10 md:py-8">
              <p className="text-[11px] leading-[1.95] text-zinc-500 md:text-[12px]">
                I recently used the services of thisbTravel Agency for my trip
                to Europe and I could not be happier. The team took care of
                everything <br /> from flights to hotels to tours, making my
                trip planning stress-free. They were very knowledgeable about
                the destinations and gave <br /> great recommendations on things
                to do and see.{" "}
              </p>

              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={AUTHOR_AVATAR}
                    alt="Author avatar"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-zinc-800">
                    Billy Smart
                  </p>
                  <p className="text-[10px] text-zinc-400">Editor</p>
                </div>
              </div>
            </div>
            <div>
              <p>
                <p>
                  Our team of experienced travel experts is here to help you
                  plan every aspect of your trip, from flights and
                  accommodations to activities and tours. We understand that
                  <br />
                  everyone travel preferences are unique, which is why we take
                  the time to get to know you and your travel style before
                  creating a personalized itinerary. Once the project
                  <br /> starts, it is important to check in with the handyman
                  on a regular basis to ensure the job is being completed
                  correctly. The homeowner should also ensure that the
                  <br /> handyman is following safety protocols.
                </p>
              </p>
            </div>

            {/* GALLERY */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {galleryImages.map((item) => (
                <div
                  key={item.id}
                  className="relative aspect-1.25/1 overflow-hidden rounded-lg shadow-[0_12px_34px_rgba(0,0,0,0.06)]"
                >
                  <Image
                    src={safeText(item.icon, FALLBACK_IMAGE)}
                    alt={safeText(item.name_uz, "Gallery image")}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* TEXT BLOCK */}
            <div>
              <h2 className="text-[20px] font-bold text-zinc-950">
                Business & Holiday Travel
              </h2>

              <p className="mt-3 text-[11px] leading-[1.95] text-zinc-500 md:text-[12px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            {/* SLIDER */}
            <div className="overflow-hidden rounded-[8px] shadow-[0_12px_34px_rgba(0,0,0,0.06)]">
              <div className="aspect-[16/9] [&>*]:h-full [&>*]:w-full">
                <SwiperBlog />
              </div>
            </div>

            {/* TAG */}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-zinc-500">Vacation</span>
            </div>

            {/* LATEST TITLE */}
            <div className="mt-12 text-center">
              <p className="font-serif text-[14px] italic text-emerald-500">
                Top Pick
              </p>

              <h2 className="mt-2 text-[30px] font-bold text-zinc-950 md:text-[34px]">
                Latest Articles
              </h2>
            </div>

            {/* LATEST ARTICLES */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => (
                <LatestArticleCard
                  key={article.id}
                  image={safeText(article.icon, FALLBACK_IMAGE)}
                  title={safeText(article.description, "Untitled article")}
                  date={safeText(article.name_uz, "May 2025")}
                />
              ))}
            </div>
          </article>
        </Container>
      </section>
    </main>
  );
}
