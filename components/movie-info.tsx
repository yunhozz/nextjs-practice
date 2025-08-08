import { API_URL } from "../app/(home)/page"

async function getMovie(id: string) {
    return fetch(`${API_URL}/${id}`).then((response) => response.json())
}

export default async ({ id }: { id: string }) => {
    const movie = await getMovie(id)
    return <h3>{JSON.stringify(movie)}</h3>
}
