const BASE_URL =
  process.env.NEXT_PUBLIC_URL || "https://x8ki-letl-twmt.n7.xano.io/api:qNrTfAaz";

type ApiProps = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  revalidate?: number;
};

export default async function getData<T>({
  url,
  method = "GET",
  body,
  revalidate = 120,
}: ApiProps): Promise<T | []> {
  const fullUrl = `${BASE_URL}/${url}`;

  try {
    const res = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      next: { revalidate },
    });

    if (!res.ok) {
      if (res.status === 429) {
        console.warn("Too many requests:", fullUrl);
        return [];
      }

      const errorText = await res.text().catch(() => "No response body");

      console.error("API ERROR");
      console.error("URL:", fullUrl);
      console.error("Status:", res.status);
      console.error("Message:", errorText);

      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Network Error:", error);
    return [];
  }
}