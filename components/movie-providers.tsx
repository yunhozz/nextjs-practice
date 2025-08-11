import { API_URL } from "../app/(home)/page"
import styles from "../styles/movie-providers.module.css"
import Link from "next/link"

async function getProviders(id: string) {
    return fetch(`${API_URL}/${id}/providers`).then((response) => response.json())
}

interface IProvider {
    link?: string
    buy?: any[]
    rent?: any[]
    flatrate?: any[]
}

export default async ({ id }: { id: string }) => {
    const providers = await getProviders(id)
    const { link, ...provider } = {
        ...{ link: "", buy: [], rent: [], flatrate: [] },
        ...providers.US,
        ...providers.KR,
    } as IProvider

    return (
        <div className={styles.container}>
            <Link href={link} className={styles["provider-link"]}>
                <div className={styles["provider-container"]}>
                    {Object.entries(provider).map(([key, value]) => {
                        if (value.length === 0) return
                        return (
                            <div key={key} className={styles["provider-item"]}>
                                <span className={styles["provider-category"]}>
                                    {key === "flatrate" ? "stream" : key}
                                </span>
                                {value.map((channel, idx) => {
                                    const imgUrl = "https://image.tmdb.org/t/p/w300"
                                    const logoPath =
                                        (channel.logo_path.includes(imgUrl) ? "" : imgUrl) + channel.logo_path
                                    return <img key={idx} className={styles["provider-channel"]} src={logoPath} />
                                })}
                            </div>
                        )
                    })}
                </div>
            </Link>
        </div>
    )
}
