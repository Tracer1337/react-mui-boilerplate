import React, { useContext, useEffect } from "react"
import { MemoryRouter, Switch, Route, Redirect, useHistory } from "react-router-dom"

import { AppContext } from "../App.js"
import ProtectedRoute from "./ProtectedRoute.js"
import BackButtonHandler from "../utils/BackButtonHandler.js"

import EditorPage from "../Pages/EditorPage.js"
import LoginPage from "../Pages/LoginPage.js"
import RegisterPage from "../Pages/RegisterPage.js"
import FeedPage from "../Pages/FeedPage.js"
import ExplorePage from "../Pages/ExplorePage.js"
import { createListeners } from "../utils/index.js"

function HistoryHandler() {
    const context = useContext(AppContext)

    const history = useHistory()

    useEffect(() => {
        return createListeners(context, [
            ["backButton", history.goBack]
        ])
    })

    return null
}

function Router() {
    const context = useContext(AppContext)

    return (
        <MemoryRouter>
            <Switch>
                <Route path="/login">
                    <LoginPage/>
                </Route>

                <Route path="/register">
                    <RegisterPage/>
                </Route>

                <ProtectedRoute path="/feed">
                    <FeedPage/>
                </ProtectedRoute>

                <ProtectedRoute path="/explore">
                    <ExplorePage/>
                </ProtectedRoute>

                <Route path="/editor">
                    <EditorPage/>
                </Route>

                <Route path="/">
                    <Redirect to="/editor"/>
                </Route>
            </Switch>

            <BackButtonHandler onBackButton={() => context.dispatchEvent("backButton")}/>
            <HistoryHandler/>
        </MemoryRouter>
    )
}

export default Router