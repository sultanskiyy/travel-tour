const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  process.env.API_URL?.trim() ||
  "";

type GetDataProps = {
  url: string;
  options?: RequestInit;
};

export default async function getData({ url, options }: GetDataProps) {
  try {
    const fullUrl = `${BASE_URL.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;

    const res = await fetch(fullUrl, {
      cache: "no-store",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      console.error(`[getData] ${url} failed:`, res.status);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`[getData] ${url} error:`, error);
    return [];
  }
}