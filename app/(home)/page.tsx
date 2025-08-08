import { Metadata } from "next"
import Movie from "../../components/movie"
import styles from "../../styles/home.module.css"

export const metadata: Metadata = {
    title: "Home",
}

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies"

async function getMovies() {
    return fetch(API_URL) // fetch한 응답을 Nextjs에서 캐싱
        .then((response) => response.json())
}

export default async () => {
    const movies = await getMovies()
    return (
        <div className={styles.container}>
            {movies.map((movie) => (
                <Movie key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path} />
            ))}
        </div>
    )
}
