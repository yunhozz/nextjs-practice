"use client" // backend - rendering, frontend - hydration (interactive with JS)
// 모든 컴포넌트들은 백엔드로부터 렌더링됨. (Server Side Rendering -> HTML)
// 그 후, "use client" 가 선언된 컴포넌트에서 hydration이 필요한 요소에만 JavaScript가 실행됨. (usePathname, useState, useEffect 등)

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default () => {
    const path = usePathname()
    const [count, setCount] = useState(0)
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                    {path === "/" ? " (Active)" : ""}
                </li>
                <li>
                    <Link href="/about-us">About Us</Link>
                    {path === "/about-us" ? " (Active)" : ""}
                </li>
                <li>
                    <button onClick={() => setCount((c) => c + 1)}>{count}</button>
                </li>
            </ul>
        </nav>
    )
}
