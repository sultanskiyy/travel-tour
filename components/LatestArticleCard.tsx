import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number | string;
  title: string;
  image?: string | null;
  date?: string;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80";

function getSafeImageSrc(value?: string | null) {
  if (!value) return FALLBACK_IMAGE;

  const trimmed = value.trim();

  if (!trimmed || trimmed === "string") return FALLBACK_IMAGE;

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return FALLBACK_IMAGE;
}

export default function LatestArticleCard({ id, title, image, date }: Props) {
  return (
    <Link href={`/blog/${id}`} className="block w-full">
      <div className="overflow-hidden rounded-md">
        <Image
          src={getSafeImageSrc(image)}
          alt={title || "Article image"}
          width={300}
          height={220}
          className="h-55 w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <div className="pt-4">
        {date ? <p className="text-sm text-gray-500">{date}</p> : null}
        <h3 className="mt-2 text-lg font-semibold text-gray-900">{title}</h3>
      </div>
    </Link>
  );
}
