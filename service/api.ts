const BASE_URL =
  process.env.API_URL?.trim() ||
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  "";

type GetDataProps = {
  url: string;
  options?: RequestInit;
};

function buildUrl(url: string) {
  const isAbsolute =
    url.startsWith("http://") || url.startsWith("https://");

  if (isAbsolute) return url;

  if (!BASE_URL) {
    throw new Error("API_URL or NEXT_PUBLIC_API_URL topilmadi");
  }

  return `${BASE_URL.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;
}

export default async function getData({ url, options }: GetDataProps) {
  try {
    const fullUrl = buildUrl(url);

    const res = await fetch(fullUrl, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    });

    console.log("[getData] BASE_URL =", BASE_URL);
    console.log("[getData] FULL_URL =", fullUrl);
    console.log("[getData] STATUS =", res.status);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[getData] request failed");
      console.error("URL:", fullUrl);
      console.error("Status:", res.status);
      console.error("Body:", text);
      return [];
    }

    const contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const text = await res.text().catch(() => "");
      console.error("[getData] response JSON emas");
      console.error("URL:", fullUrl);
      console.error("Content-Type:", contentType);
      console.error("Body:", text);
      return [];
    }

    const data = await res.json();

    console.log(
      "[getData] success =",
      Array.isArray(data) ? `array(${data.length})` : typeof data
    );

    return data;
  } catch (error) {
    console.error("[getData] fetch error");
    console.error("Requested url:", url);
    console.error("BASE_URL:", BASE_URL);
    console.error(error);
    return [];
  }
}