import React, { useContext } from "react"
import { useHistory, Link, Redirect } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

import { AppContext } from "../App.js"
import Layout from "../components/Layout/Layout.js"
import RegisterForm from "../components/Forms/RegisterForm.js"

const useStyles = makeStyles(theme => ({
    registerPage: {
        marginTop: theme.spacing(6),
        maxWidth: 300
    },

    link: {
        marginTop: theme.spacing(1)
    }
}))

function RegisterPage() {
    const context = useContext(AppContext)

    const history = useHistory()

    const classes = useStyles()

    const handleOnRegister = () => {
        history.push("/")
    }

    if (context.auth.isLoggedIn) {
        return (
            <Redirect to="/"/>
        )
    }

    return (
        <Layout center>
            <div className={classes.registerPage}>
                <RegisterForm onRegister={handleOnRegister}/>
            </div>

            <Link className={classes.link} to="/login">
                I already have an account
            </Link>
        </Layout>
    )
}

export default RegisterPage