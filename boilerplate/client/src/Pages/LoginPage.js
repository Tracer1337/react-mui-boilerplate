import React, { useContext } from "react"
import { useHistory, Link, Redirect } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

import { AppContext } from "../App.js"
import Layout from "../components/Layout/Layout.js"
import LoginForm from "../components/Forms/LoginForm.js"

const useStyles = makeStyles(theme => ({
    loginPage: {
        marginTop: theme.spacing(6),
        maxWidth: 300
    },

    link: {
        marginTop: theme.spacing(1)
    }
}))

function LoginPage() {
    const context = useContext(AppContext)

    const history = useHistory()

    const classes = useStyles()

    const handleOnLogin = () => {
        history.push("/")
    }

    if (context.auth.isLoggedIn) {
        return <Redirect to="/"/>
    }

    return (
        <Layout center>
            <div className={classes.loginPage}>
                <LoginForm onLogin={handleOnLogin} />
            </div>

            <Link className={classes.link} to="/register">
                Create an account
            </Link>
        </Layout>
    )
}

export default LoginPage