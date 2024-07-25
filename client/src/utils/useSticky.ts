import { useEffect, useRef, useState } from "react"

const useSticky = () => {
    const ref = useRef<HTMLDivElement>(null)

    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        if (!ref.current) {
            return
        }

        const observer = new IntersectionObserver(
            ([event]) => setIsSticky(event.intersectionRatio < 1),//callback
            {threshold: [1], rootMargin: '-80px 0px 0px 0px',}//options
        )
        observer.observe(ref.current)

        return () => observer.disconnect()
    }, [])

    return {ref, isSticky}
}

export default useSticky;