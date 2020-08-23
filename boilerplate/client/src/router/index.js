import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import IndexPage from "../pages/IndexPage.js"
import Analytics from "../utils/Analytics.js"

function Router() {
    return (
        <BrowserRouter>
            {/* Utilities that require router context */}
            <Analytics/>

            <Switch>
                <Route path="/">
                    <IndexPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router