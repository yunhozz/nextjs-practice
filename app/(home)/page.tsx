import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Home",
}

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies"

async function getMovies() {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Loading by backend
    return fetch(API_URL) // fetch한 응답을 Nextjs에서 캐싱
        .then((response) => response.json())
}

export default async () => {
    const movies = await getMovies()
    return (
        <div>
            {movies.map((movie) => (
                <li key={movie.id}>
                    <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
            ))}
        </div>
    )
}
