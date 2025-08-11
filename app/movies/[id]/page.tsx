import { Metadata } from "next"
import MovieInfo, { getMovie } from "../../../components/movie-info"
import MovieVideos from "../../../components/movie-videos"
import { Suspense } from "react"
import MovieProviders from "../../../components/movie-providers"
import MovieCredits from "../../../components/movie-credits"

export async function generateMetadata({ params }: { params: Promise<TParams> }): Promise<Metadata> {
    const { id } = await params
    const movie = await getMovie(id)
    return {
        title: movie.title,
    }
}

type TParams = {
    id: string
    [key: string]: unknown
}

type TSearchParams = {
    region: string
    page: number
    [key: string]: unknown
}

export default async ({ params, searchParams }: { params: Promise<TParams>; searchParams: Promise<TSearchParams> }) => {
    const [{ id }, { region, page }] = await Promise.all([params, searchParams])

    console.log(`Movie ID=${id}, Region=${region}, Page=${page}`)

    // const [movie, videos] = await Promise.all([movieInfo({id}), movieVideos({id})]);

    return (
        <div>
            {/*{movie}*/}
            {/*{videos}*/}
            <Suspense fallback={<h3>Loading movie info...</h3>}>
                <MovieInfo id={id} />
            </Suspense>
            <Suspense fallback={<h3>Loading movie videos...</h3>}>
                <MovieVideos id={id} />
            </Suspense>
        </div>
    )
}

/*
Promise.all() approach:
- Blocks rendering until both requests complete
- Shows all content at once
- Better for dependent data

Suspense approach (current):
- Allows progressive loading
- Shows loading states independently
- Better user experience for independent data
 */
