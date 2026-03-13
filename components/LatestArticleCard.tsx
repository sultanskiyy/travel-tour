import Image from "next/image";

type Props = {
  image: string;
  title: string;
  date: string;
};

export default function LatestArticleCard({ image, title, date }: Props) {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md">
        <Image
          src={image}
          alt={title}
          width={300}
          height={95}
          className="h-[95px] w-full rounded-md object-cover"
        />
      </div>

      <h3 className="mt-2 text-[11px] font-semibold leading-4 text-black">
        {title}
      </h3>

      <p className="mt-1 text-[9px] text-gray-500">{date}</p>

      <button className="mt-3 rounded-sm bg-emerald-500 px-3 py-1 text-[9px] font-medium text-white">
        Read More
      </button>
    </div>
  );
}
