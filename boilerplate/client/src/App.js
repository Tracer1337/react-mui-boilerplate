import React, { useState, useEffect, useReducer } from "react"
import { CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Router from "./Router/Router.js"
import OfflineUseAlerts from "./utils/OfflineUseAlerts.js"
import { setTokenHeader } from "./config/api.js"
import { getProfile } from "./config/api.js"
import { useStore } from "./store/store.js"
import { createListeners } from "./utils/index.js"

const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            margin: 0,
            backgroundColor: theme.palette.background.default
        },

        a: {
            color: theme.palette.text.primary,
            textDecoration: "none",
            fontFamily: theme.typography.fontFamily
        }
    }
}))

const AppContext = React.createContext()

function App() {
    useStyles()
    
    const store = useStore()

    const [isLoading, setIsLoading] = useState(!!localStorage.getItem("token"))

    const [updateKey, forceUpdate] = useReducer(key => key + 1, 0)

    useEffect(() => {
        if (store.auth.token) {
            setTokenHeader(store.auth.token)
            getProfile()
                .then(res => {
                    store.set({
                        auth: {
                            user: res.data,
                            isLoggedIn: true
                        }
                    })
                })
                .finally(() => setIsLoading(false))
        }

        // eslint-disable-next-line
    }, [updateKey])

    useEffect(() => {
        return createListeners(store, [
            ["reloadProfile", forceUpdate]
        ])
    })
    
    window.store = store

    return (
        <AppContext.Provider value={store}>
            <OfflineUseAlerts />

            {isLoading ? (
                <CircularProgress/>
            ) : (
                <Router/>
            )}
        </AppContext.Provider>
    )
}

export default App

export {
    AppContext
}