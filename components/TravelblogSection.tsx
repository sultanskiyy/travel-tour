import LatestArticleCard from "./LatestArticleCard";

export default function TravelBlogSection() {
  const latestArticles = [
    {
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
      title: "Welcome This Holiday With Great Travel Trip",
      date: "September 22, 2024",
    },
    {
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
      title: "Travel To The Most Beautiful Place In The World",
      date: "September 22, 2024",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80",
      title: "Welcome This Budget Travel For Holiday",
      date: "September 22, 2024",
    },
  ];

  return (
    <section className="bg-[#f3f3f3] py-8">
      <div className="mx-auto max-w-[760px] bg-white px-8 py-10">
        <div className="text-center">
          <h1 className="text-[18px] font-semibold text-black">
            Plan the Perfect Vacation
          </h1>
          <div className="mx-auto mt-2 h-3 w-3 rounded-full bg-emerald-500" />
        </div>

        <div className="mt-8">
          <img
            src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1400&q=80"
            alt="Vacation hero"
            className="h-[260px] w-full rounded-md object-cover shadow-md"
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-[11px] text-emerald-500">Top Pick</p>
          <h2 className="mt-1 text-[24px] font-semibold text-black">
            Latest Articles
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {latestArticles.map((article, index) => (
            <LatestArticleCard
              key={index}
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