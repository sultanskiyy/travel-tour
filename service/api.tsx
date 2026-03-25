const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

type GetDataProps = {
  url: string;
  options?: RequestInit;
};

export default async function getData({ url, options }: GetDataProps) {
  try {
    const isAbsoluteUrl =
      url.startsWith("http://") || url.startsWith("https://");

    const fullUrl = isAbsoluteUrl
      ? url
      : `${BASE_URL.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;

    const res = await fetch(fullUrl, {
      cache: "no-store",
      ...options,
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "No response body");

      console.log("[getData failed]");
      console.log("URL:", fullUrl);
      console.log("Status:", res.status);
      console.log("Message:", errorText);

      return [];
    }

    return await res.json();
  } catch (error) {
    console.log("[getData fetch error]");
    console.log("URL:", url);
    console.log("Error:", error);

    return [];
  }
}