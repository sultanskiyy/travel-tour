import Container from "@/components/Container";

type PromoItem = {
  id?: number | string;
  label?: string;
  title?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
  progress_items?: Array<{
    label?: string;
    value?: number | string;
  }>;
};

type RawItem = Record<string, unknown>;

type Props = {
  promoData?: RawItem[];
};

function pickString(obj: RawItem, keys: string[]) {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.trim() !== "") {
      return value;
    }
  }
  return "";
}

function pickArray(obj: RawItem, keys: string[]) {
  for (const key of keys) {
    const value = obj[key];
    if (Array.isArray(value)) {
      return value;
    }
  }
  return [];
}

function normalizePercent(value: unknown, fallback = 80) {
  if (typeof value === "number") {
    return Math.max(0, Math.min(100, value));
  }

  if (typeof value === "string") {
    const parsed = Number(value.replace("%", "").trim());
    if (!Number.isNaN(parsed)) {
      return Math.max(0, Math.min(100, parsed));
    }
  }

  return fallback;
}

export default function AdventurePromoSection({ promoData = [] }: Props) {
  const source = promoData[0] || {};

  const eyebrow =
    pickString(source, ["label", "eyebrow", "subtitle", "tag"]) ||
    "Wandering Souls";

  const title =
    pickString(source, ["title", "heading", "name"]) ||
    "Discover Your Next Adventure";

  const description =
    pickString(source, ["description", "desc", "text", "content"]) ||
    "Whether you're planning a romantic honeymoon or a family vacation, our price section has got you covered. So, start browsing today and find the perfect vacation package at a price that won't leave you feeling guilty.";

  const buttonText =
    pickString(source, ["button_text", "buttonLabel", "cta_text"]) ||
    "MORE INFO";

  const buttonLink =
    pickString(source, ["button_link", "buttonUrl", "cta_link", "link"]) || "#";

  const rawProgress = pickArray(source, ["progress_items", "items", "stats"]);

  const progressItems =
    rawProgress.length > 0
      ? rawProgress.map((item, index) => {
          const row = item as RawItem;

          return {
            id: String(row.id ?? index),
            label:
              pickString(row, ["label", "title", "name"]) ||
              `Item ${index + 1}`,
            value: normalizePercent(row.value, index === 0 ? 90 : 80),
          };
        })
      : [
          {
            id: "1",
            label: "Organized Group Tour",
            value: 90,
          },
          {
            id: "2",
            label: "Single Customized Trip",
            value: 80,
          },
        ];

  return (
    <section className="py-16 md:py-24">
      <Container className="px-9">
        <div className="mx-auto">
          <div className="bg-white py-6 md:py-10">
            <div className="grid min-h-77.5 grid-cols-1 md:grid-cols-2">
              <div className="max-w-107.5">
                <p className="mb-4 text-sm italic text-teal-500">{eyebrow}</p>

                <h2 className="mb-5 text-4xl font-extrabold leading-tight text-black md:text-5xl">
                  {title}
                </h2>

                <p className="mb-6 text-sm leading-7 text-gray-500 md:text-base">
                  {description}
                </p>

                <div className="space-y-4">
                  {progressItems.slice(0, 2).map((item) => (
                    <div key={item.id}>
                      <p className="mb-2 text-sm text-gray-500">{item.label}</p>

                      <div className="h-[4px] w-full bg-gray-200">
                        <div
                          className="h-[4px] bg-gray-600"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={buttonLink}
                  className="mt-6 inline-flex h-10 items-center justify-center bg-teal-500 px-5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-teal-600"
                >
                  {buttonText}
                </a>
              </div>

              <div className="hidden md:block" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
