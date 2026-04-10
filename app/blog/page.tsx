export const dynamic = "force-dynamic";

import Image from "next/image";
import LatestArticleCard from "@/components/LatestArticleCard";
import SwiperBlog from "@/components/SwiperBlog";
import Container from "@/components/Container";
import { getData } from "@/service/api";
import type { CategoryType } from "@/types/CategoryType";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&q=80";

const BLOG_BG =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=2000&q=80";

const AUTHOR_AVATAR = "https://i.pravatar.cc/80?img=12";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80";

function safeText(value?: string | null, fallback = "") {
  if (!value) return fallback;

  const text = value.trim();

  if (!text || text === "string") return fallback;

  return text;
}

function getSafeImageSrc(value?: string | null, fallback = FALLBACK_IMAGE) {
  if (!value) return fallback;

  const trimmed = value.trim();

  if (!trimmed || trimmed === "string") return fallback;

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return fallback;
}

export default async function BlogPage() {
  let categories: CategoryType[] = [];

  try {
    const response = await getData({ url: "category" });
    categories = Array.isArray(response) ? (response as CategoryType[]) : [];
  } catch (error) {
    console.error("BLOG PAGE API ERROR:", error);
    categories = [];
  }

  const validCategories = categories.filter(
    (item) => item?.id && safeText(item.name_uz || item.name),
  );

  const galleryImages = validCategories.slice(3, 5);
  const latestArticles = validCategories.slice(0, 3);

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24 lg:pb-40 lg:pt-28">
        <Image
          src={BLOG_BG}
          alt="Blog background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <Container className="relative z-10 px-4 md:px-9">
          <div className="flex min-h-[220px] flex-col items-center justify-center text-center md:min-h-[280px] lg:min-h-[320px]">
            <h1 className="text-[34px] font-extrabold tracking-[-0.04em] text-white md:text-[48px] lg:text-[58px]">
              Plan the Perfect Vacation
            </h1>

            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 md:text-[12px]">
              Apr 7 2023
            </p>

            <div className="mt-7 flex justify-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#20c4a6] shadow-[0_10px_24px_rgba(32,196,166,0.25)]">
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

      <section className="relative z-10 -mt-10 md:-mt-16 lg:-mt-20">
        <Container className="px-4 md:px-9">
          <div className="overflow-hidden rounded-[10px] shadow-[0_22px_55px_rgba(15,23,42,0.10)]">
            <div className="relative aspect-[1920/613] w-full">
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

      <section className="pb-16 pt-10">
        <Container className="px-4 md:px-9">
          <article className="space-y-8">
            <div className="space-y-4 text-[11px] leading-[1.95] text-zinc-500 md:text-[12px]">
              <p>
                There are so many places to explore and so many adventures
                waiting for you. What makes a great travel destination depends
                on what kind of traveler you are, whether it is culture, natural
                beauty, or history that interests you most.
              </p>

              <p>
                There are also practical considerations like cost, time spent
                traveling from place to place, and even how much luggage space
                there is. No matter what kind of traveler you are, it is always
                important to consider many factors before booking a trip.
              </p>
            </div>

            <div className="rounded-lg bg-[#f7f7f7] px-6 py-7 text-center md:px-10 md:py-8">
              <p className="text-[11px] leading-[1.95] text-zinc-500 md:text-[12px]">
                I recently used the services of this travel agency for my trip
                to Europe and I could not be happier. The team took care of
                everything from flights to hotels to tours, making my trip
                planning stress-free.
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
              <p className="text-[11px] leading-[1.95] text-zinc-500 md:text-[12px]">
                Our team of experienced travel experts is here to help you plan
                every aspect of your trip, from flights and accommodations to
                activities and tours. We understand that every traveler has
                unique preferences, so we take the time to build a journey that
                fits your style.
              </p>
            </div>

            {galleryImages.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {galleryImages.map((item) => (
                  <div
                    key={String(item.id)}
                    className="relative aspect-[5/4] overflow-hidden rounded-lg shadow-[0_12px_34px_rgba(0,0,0,0.06)]"
                  >
                    <Image
                      src={getSafeImageSrc(item.icon)}
                      alt={safeText(item.name_uz || item.name, "Gallery image")}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
                Gallery topilmadi
              </div>
            )}

            <div>
              <h2 className="text-[20px] font-bold text-zinc-950">
                Business & Holiday Travel
              </h2>

              <p className="mt-3 text-[11px] leading-[1.95] text-zinc-500 md:text-[12px]">
                Discover destinations that fit both your business needs and your
                dream vacation plans.
              </p>
            </div>

            <div className="overflow-hidden rounded-[8px] shadow-[0_12px_34px_rgba(0,0,0,0.06)]">
              <div className="aspect-[16/9] [&>*]:h-full [&>*]:w-full">
                <SwiperBlog />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-zinc-500">Vacation</span>
            </div>

            <div className="mt-12 text-center">
              <p className="font-serif text-[14px] italic text-emerald-500">
                Top Pick
              </p>

              <h2 className="mt-2 text-[30px] font-bold text-zinc-950 md:text-[34px]">
                Latest Articles
              </h2>
            </div>

            {latestArticles.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {latestArticles.map((article) => (
                  <LatestArticleCard
                    key={String(article.id)}
                    id={article.id}
                    image={getSafeImageSrc(article.icon)}
                    title={safeText(
                      article.description || article.name_uz || article.name,
                      "Untitled article",
                    )}
                    date={safeText(article.name_uz || article.name, "May 2025")}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
                Articles topilmadi
              </div>
            )}
          </article>
        </Container>
      </section>
    </main>
  );
}
