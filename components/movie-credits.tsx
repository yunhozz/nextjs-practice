import { API_URL } from "../app/(home)/page"
import styles from "../styles/movie-credits.module.css"

async function getCredits(id: string) {
    return fetch(`${API_URL}/${id}/credits`).then((response) => response.json())
}

export default async ({ id }: { id: string }) => {
    const credits = await getCredits(id)
    return (
        <div className={styles.container}>
            <div className={styles["credit-container"]}>
                {credits.map((credit, idx) => {
                    const backgroundStyle = credit.profile_path && {
                        backgroundImage: `url(${credit.profile_path})`,
                    }
                    return (
                        <div key={idx} className={styles["credit-item"]}>
                            <span className={styles["credit-name"]}>{credit.name}</span>
                            <div className={styles["credit-img"]} style={backgroundStyle} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
