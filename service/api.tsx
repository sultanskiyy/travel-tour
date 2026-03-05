const BASE_URL = process.env.NEXT_PUBLIC_URL
const getData = async ({ url }: { url: string }) => {
    const res = await fetch(`${BASE_URL}/${url}` , {
        next:
        {
            revalidate: 120
        }
    });
    const data = await res.json();
    return data
}

export default getData