import { Link } from "lucide-react";
import LatestArticleCard from "./LatestArticleCard";

type Article = {
  id?: number | string;
  title: string;
  image?: string | null;
  date?: string;
};

const latestArticles: Article[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    title: "The Amazing Difference a Year of Travelling.",
    date: "July 27, 2025",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
    title: "Reflections on 5 Months of Travel: Time to Hang",
    date: "July 27, 2025",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    title: "How to Save Money While Visiting Africa.",
    date: "July 27, 2025",
  },
];

export default function TravelblogSection() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-500">
              Travel Blog
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
              Latest Articles
            </h2>
          </div>

          <Link
            href="/blog"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            View All
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article, index) => (
            <LatestArticleCard
              key={article.id ?? index}
              id={article.id ?? index}
              image={article.image}
              title={article.title}
              date={article.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
