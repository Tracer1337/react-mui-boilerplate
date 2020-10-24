import React, { useContext } from "react"
import { Redirect, Route } from "react-router-dom"

import { AppContext } from "../App.js"

function ProtectedRoute({ path, children }) {
    const context = useContext(AppContext)

    return (
        <Route path={path}>
            { !context.auth.isLoggedIn ? (
                <Redirect to="/login"/>
            ) : children }
        </Route>
    )
}

export default ProtectedRoute