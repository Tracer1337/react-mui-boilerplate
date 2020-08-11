import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import IndexPage from "../pages/IndexPage.js"

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <IndexPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router