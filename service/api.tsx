const BASE_URL =
  process.env.NEXT_PUBLIC_URL || "https://x8ki-letl-twmt.n7.xano.io/api:qNrTfAaz";

type GetDataProps = {
  url: string;
};

export default async function getData({ url }: GetDataProps) {
  const fullUrl = `${BASE_URL}/${url}`;

  try {
    const res = await fetch(fullUrl, {
      next: { revalidate: 120 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      let errorText = "";

      try {
        errorText = await res.text();
      } catch {
        errorText = "No response body";
      }

      console.error("API request failed");
      console.error("URL:", fullUrl);
      console.error("Status:", res.status);
      console.error("Response:", errorText);

      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Network/API Error:", error);
    return [];
  }
}