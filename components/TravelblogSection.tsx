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
                {/* Top title */}
                <div className="text-center">
                    <h1 className="text-[18px] font-semibold text-black">
                        Plan the Perfect Vacation
                    </h1>
                    <div className="mx-auto mt-2 h-3 w-3 rounded-full bg-emerald-500" />
                </div>

                {/* Hero image */}
                <div className="mt-8">
                    <img
                        src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1400&q=80"
                        alt="Vacation hero"
                        className="h-[260px] w-full rounded-md object-cover shadow-md"
                    />
                </div>

                {/* Small paragraph */}
                <div className="mt-8">
                    <p className="text-[11px] leading-5 text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                        luctus, nisl at dignissim viverra, lacus erat facilisis turpis, sed
                        congue turpis arcu eget lorem. Suspendisse potenti. Sed at erat
                        vitae tortor consequat efficitur. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                    </p>
                </div>

                {/* Quote block */}
                <div className="mt-8 rounded-md bg-[#f8f8f8] px-8 py-6 text-center">
                    <p className="text-[11px] leading-5 text-gray-500">
                        “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                        ullamcorper, sapien eu facilisis cursus, arcu odio malesuada urna,
                        et feugiat odio nulla et velit.”
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-2">
                        <img
                            src="https://i.pravatar.cc/40?img=12"
                            alt="author"
                            className="h-7 w-7 rounded-full object-cover"
                        />
                        <span className="text-[10px] font-medium text-gray-700">
                            By Admin
                        </span>
                    </div>
                </div>

                {/* Two small images */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <img
                        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80"
                        alt="Forest"
                        className="h-[160px] w-full rounded-md object-cover"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&q=80"
                        alt="Beach"
                        className="h-[160px] w-full rounded-md object-cover"
                    />
                </div>

                {/* Business text */}
                <div className="mt-6">
                    <h2 className="text-[13px] font-semibold text-black">
                        Business & Holiday Travel
                    </h2>
                    <p className="mt-2 text-[11px] leading-5 text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                        facilisis, mauris non ultricies dictum, lectus elit vulputate
                        lectus, sed placerat lorem sem et massa. Nam eu est euismod,
                        volutpat risus a, mollis magna.
                    </p>
                </div>

                {/* Big image */}
                <div className="mt-8">
                    <img
                        src="https://images.unsplash.com/photo-1543429776-2782fcfea59f?w=1400&q=80"
                        alt="City view"
                        className="h-[260px] w-full rounded-md object-cover"
                    />
                </div>

                {/* Tag */}
                <div className="mt-4">
                    <span className="text-[10px] text-gray-500"># Travel</span>
                </div>

                {/* Latest Articles */}
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