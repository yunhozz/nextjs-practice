import { API_URL } from "../app/(home)/page"

async function getVideos(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 5000)) // Loading by backend
    return fetch(`${API_URL}/${id}/videos`).then((response) => response.json())
}

export default async ({ id }: { id: string }) => {
    const videos = await getVideos(id)
    return <h3>{JSON.stringify(videos)}</h3>
}
