import React, { useContext } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { AppContext } from "../../App.js"
import Input from "./components/Input.js"
import { login } from "../../config/api.js"

const useStyles = makeStyles(theme => ({
    submit: {
        marginTop: theme.spacing(2)
    }
}))

function LoginForm({ onLogin }) {
    const context = useContext(AppContext)

    const formObject = useForm()
    const { handleSubmit, setError } = formObject

    const classes = useStyles()

    const onSubmit = (values) => {
        login(values)
            .then(res => {
                context.set({
                    auth: {
                        token: res.data.token,
                        user: res.data.user,
                        isLoggedIn: true
                    }
                })

                if (onLogin) {
                    onLogin()
                }
            })
            .catch(res => {
                const errors = res.response.data

                for (let name in errors) {
                    setError(name, {
                        message: errors[name].message
                    })
                }
            })
    }

    return (
        <FormProvider {...formObject}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <Input
                    name="email"
                    label="Email"
                />

                {/* Password */}
                <Input
                    type="password"
                    name="password"
                    label="Password"
                />

                <Button
                    type="submit"
                    fullWidth
                    className={classes.submit}
                >Login</Button>
            </form>
        </FormProvider>
    )
}

export default LoginForm