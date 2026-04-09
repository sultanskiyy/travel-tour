const BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://x8ki-letl-twmt.n7.xano.io/api:qNrTfAaz";

type GetDataProps = {
  url: string;
};

export default async function getData({ url }: GetDataProps) {
  try {
    // URL ni to‘g‘ri birlashtirish
    const fullUrl = `${BASE_URL.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

    console.log("🚀 FULL URL:", fullUrl);

    const res = await fetch(fullUrl, {
      method: "GET",
      cache: "no-store",
    });

    console.log("📡 STATUS:", res.status);

    if (!res.ok) {
      console.error("❌ API ERROR:", res.status);
      return [];
    }

    const data = await res.json();

    console.log(
      "✅ DATA:",
      Array.isArray(data) ? `array(${data.length})` : data
    );

    return data;
  } catch (error) {
    console.error("🔥 FETCH ERROR:", error);
    return [];
  }
}