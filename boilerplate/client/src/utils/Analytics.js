import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import ReactGA from "react-ga"

import { GA_TRACKING_ID, IS_DEV } from "../config/constants.js"

function Analytics() {
    const location = useLocation()

    /**
     * Initialize GA
     */
    useEffect(() => {
        if (IS_DEV) {
            return
        }

        ReactGA.initialize(GA_TRACKING_ID)

        ReactGA.pageview(window.location.pathname)
    }, [])

    /**
     * Trigger pageview on route change
     */
    useEffect(() => {
        if (IS_DEV) {
            return
        }

        const page = location.pathname + location.search
        ReactGA.set({ page })
        ReactGA.pageview(page)
    })

    return null
}

export default Analytics