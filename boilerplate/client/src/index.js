import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"

import store from "./store"
import App from "./App.js"
import * as serviceWorker from "./serviceWorker.js"
import "./index.css"

const theme = createMuiTheme({
    palette: {
        theme: "dark",
        type: "dark",

        background: {
            default: "#282833",
            paper: "#333340"
        },

        primary: {
            main: "#BB86FC",
            variant: "#3700B3"
        },

        secondary: {
            main: "#03DAC5",
            dark: "#336D6F"
        },

        error: {
            main: "#CF6679"
        }
    }
})

if (process.env.NODE_ENV === "development") {
    console.log(theme)
}

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
