const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:qNrTfAaz";

type GetDataProps = {
  url: string;
};

export default async function getData({ url }: GetDataProps) {
  try {
    const fullUrl = `${BASE_URL}/${url}`;

    const res = await fetch(fullUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();

      console.error("API request failed");
      console.error("URL:", fullUrl);
      console.error("Status:", res.status);
      console.error("Response:", errorText);

      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}