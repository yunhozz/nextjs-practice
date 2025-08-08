import { Metadata } from "next"
import MovieInfo from "../../../components/movie-info"
import MovieVideos from "../../../components/movie-videos"
import { Suspense } from "react"
import movieInfo from "../../../components/movie-info"
import movieVideos from "../../../components/movie-videos"

export const metadata: Metadata = {
    title: "Movie Details",
}

type Params = {
    id: string
    [key: string]: unknown
}

type SearchParams = {
    region: string
    page: number
    [key: string]: unknown
}

export default async ({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<SearchParams> }) => {
    const [{ id }, { region, page }] = await Promise.all([params, searchParams])

    console.log(`Movie ID=${id}, Region=${region}, Page=${page}`)

    // const [movie, videos] = await Promise.all([movieInfo({id}), movieVideos({id})]);

    return (
        <div>
            <h2>Movie Detail Page</h2>
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
