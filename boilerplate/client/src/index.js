import React from "react"
import ReactDOM from "react-dom"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

import App from "./App.js"
import { IS_DEV, IS_CORDOVA } from "./config/constants.js"
import * as serviceWorker from "./serviceWorker.js"
import "./index.css"

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#BB86FC",
            variant: "#3700B3"
        }
    }
})

function start() {
    ReactDOM.render((
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    ), document.getElementById("root"))
}

if (!IS_CORDOVA) {
    start()
    serviceWorker.register()
} else {
    document.addEventListener("deviceready", start, false)
}

if (IS_DEV) {
    console.log(theme)
}