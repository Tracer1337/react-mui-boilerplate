import React from "react"
import { CssBaseline } from "@material-ui/core"

import Router from "./router/index.js"

function App() {
    return (
        <div>
            <CssBaseline/>

            <Router/>
        </div>
    )
}

export default App