

import Image from "next/image";
import LatestArticleCard from "@/components/LatestArticleCard";
import getData from "@/service/api";
import { CategoryType } from "@/types/CategoryType";
import SwiperBlog from "@/components/SwiperBlog";
import Container from "@/components/Container";


const page = async() => {

  const categoryimg = await getData({ url:"category"})
  console.log(categoryimg);
  

  return (
    <section className="bg-[#f3f3f3] py-10">
      <div className=" bg-white px-6 py-8 sm:px-8 sm:py-10">
        {/* title */}
        <div className="text-center">
          <h1 className="text-[18px] font-semibold text-black sm:text-[20px]">
            Plan the Perfect Vacation
          </h1>
          <div className="mx-auto mt-2 h-3 w-3 rounded-full bg-emerald-500" />
        </div>

        {/* hero image */}
        <div className="relative mt-8 h-[260px] w-full overflow-hidden rounded-md shadow-md">
          <Image
            src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1400&q=80"
            alt="Vacation hero"
            fill
            className="object-cover"
          />
        </div>

        {/* text */}
        <div className="mt-6">
          <p className="text-[11px] leading-5 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            luctus, nisl at dignissim viverra, lacus erat facilisis turpis, sed
            congue turpis arcu eget lorem. Suspendisse potenti. Sed at erat
            vitae tortor consequat efficitur. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
        </div>

        {/* quote */}
        <div className="mt-8 rounded-md bg-[#f7f7f7] px-6 py-6 text-center sm:px-8">
          <p className="text-[11px] leading-5 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            ullamcorper, sapien eu facilisis cursus, arcu odio malesuada urna,
            et feugiat odio nulla et velit.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="relative h-7 w-7 overflow-hidden rounded-full">
              <Image
                src="https://i.pravatar.cc/40?img=12"
                alt="author"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[10px] font-medium text-gray-700">
              By Admin
            </span>
          </div>
        </div>

        {/* gallery mapped images */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {categoryimg.slice(3 , 5).map((item:CategoryType) => (
            <div
              key={item.id}
              className="relative h-[160px] w-full overflow-hidden rounded-md"
            >
              <Image
                src={item?.icon || "/no-image.png"}
                alt={item?.name_uz || "image"}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* text block */}
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

        {/* second big image */}
       
          <div className="relative mt-8 h-[260px] w-full overflow-hidden rounded-md shadow-md">
           <SwiperBlog/>
          </div>
        {/* tag */}
        <div className="mt-4 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-gray-500"># Vacation</span>
        </div>

        {/* latest articles title */}
        <div className="mt-12 text-center">
          <p className="text-[11px] text-emerald-500">Top Pick</p>
          <h2 className="mt-1 text-[24px] font-semibold text-black">
            Latest Articles
          </h2>
        </div>

        {/* mapped cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {categoryimg?.map((article:CategoryType) => (
            <LatestArticleCard
              key={article?.id}
              image={article?.icon || "/no-image.png"}
              title={article?.description || "No title"}
              date={article?.name_uz}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;