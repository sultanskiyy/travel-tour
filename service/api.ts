const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:qNrTfAaz";

type GetDataParams = {
  url: string;
  params?: Record<string, string | number | boolean>;
};

export async function getData({ url, params }: GetDataParams): Promise<unknown> {
  const fullUrl = new URL(`${BASE_URL}/${url}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      fullUrl.searchParams.set(key, String(value));
    });
  }

  const response = await fetch(fullUrl.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText} — ${url}`);
  }

  return response.json();
}