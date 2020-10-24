import { useEffect, useRef } from "react"
import { useHistory, useLocation } from "react-router-dom"

function useBackButton(shouldListen, onPop) {
    const history = useHistory()

    const location = useLocation()

    const historyKey = useRef()

    useEffect(() => {
        if (shouldListen) {
            if (!historyKey.current) {
                history.push(history.location.pathname)
                historyKey.current = history.entries[history.entries.length - 1].key
            }
        } else {
            historyKey.current = null
        }

        // eslint-disable-next-line
    }, [shouldListen])

    useEffect(() => {
        if (historyKey.current) {
            for (let i = 0; i <= history.index; i++) {
                if (history.entries[i].key === historyKey.current) {
                    return
                }
            }

            onPop()
        }

        // eslint-disable-next-line
    }, [location])
}

export default useBackButton