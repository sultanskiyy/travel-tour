const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

type GetDataProps = {
  url: string;
  options?: RequestInit;
};

export default async function getData({ url, options }: GetDataProps) {
  try {
    if (
      !BASE_URL &&
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      console.error("[getData] NEXT_PUBLIC_API_URL topilmadi");
      console.error("[getData] requested url:", url);
      return [];
    }

    const isAbsoluteUrl =
      url.startsWith("http://") || url.startsWith("https://");

    const fullUrl = isAbsoluteUrl
      ? url
      : `${BASE_URL.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;

    console.log("[getData request]");
    console.log("BASE_URL:", BASE_URL);
    console.log("FULL_URL:", fullUrl);

    const res = await fetch(fullUrl, {
      cache: "no-store",
      ...options,
    });

    console.log("[getData status]", res.status);

    if (!res.ok) {
      const errorText = await res.text().catch(() => "No response body");

      console.error("[getData failed]");
      console.error("URL:", fullUrl);
      console.error("Status:", res.status);
      console.error("Message:", errorText);

      return [];
    }

    const data = await res.json();
    console.log("[getData success]", Array.isArray(data) ? data.length : data);

    return data;
  } catch (error) {
    console.error("[getData fetch error]");
    console.error("URL:", url);
    console.error("Error:", error);

    return [];
  }
}
