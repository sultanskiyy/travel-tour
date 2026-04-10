import Image from "next/image";

type TestimonialItem = {
  id?: number | string;
  message?: string;
  review?: string;
  feedback?: string;
  comment?: string;
  name?: string;
  full_name?: string;
  customer_name?: string;
  user_name?: string;
  location?: string;
  city?: string;
  address?: string;
  user_location?: string;
  image?: string;
  avatar?: string;
  photo?: string;
  user_image?: string;
};

type Props = {
  testimonials?: TestimonialItem[];
};

const FALLBACK_AVATAR = "/images/avatar-placeholder.png";

function getSafeImageSrc(value?: string | null) {
  if (!value) return FALLBACK_AVATAR;

  const trimmed = value.trim();

  if (!trimmed || trimmed === "string") return FALLBACK_AVATAR;

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return FALLBACK_AVATAR;
}

export default function TravelTestimonials({ testimonials = [] }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        <div className="mb-12 max-w-2xl text-white">
          <h2 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Unforgettable Travel Experiences
          </h2>

          <p className="max-w-xl text-sm leading-6 text-white/90 md:text-base">
            Our customer&apos;s feedback is essential in building a great
            reputation and maintaining excellent service.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.slice(0, 2).map((item, index) => {
            const message =
              item.message ||
              item.review ||
              item.feedback ||
              item.comment ||
              "No review text";

            const name =
              item.name ||
              item.full_name ||
              item.customer_name ||
              item.user_name ||
              "Anonymous";

            const location =
              item.location ||
              item.city ||
              item.address ||
              item.user_location ||
              "Unknown location";

            const image = getSafeImageSrc(
              item.image || item.avatar || item.photo || item.user_image
            );

            return (
              <div
                key={item.id ?? index}
                className="rounded-3xl bg-teal-400/95 p-8 text-white shadow-2xl"
              >
                <p className="mb-8 text-xl leading-9">{message}</p>

                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold">{name}</h4>
                    <p className="text-sm text-white/90">{location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
