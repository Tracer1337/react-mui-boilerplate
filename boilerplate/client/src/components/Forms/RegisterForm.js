import React, { useContext } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Button, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { AppContext } from "../../App.js"
import Input from "./components/Input.js"
import { register as apiRegister } from "../../config/api.js"

const useStyles = makeStyles(theme => ({
    link: {
        fontWeight: "bold",
        cursor: "pointer"
    },

    legal: {
        marginTop: theme.spacing(2),
        display: "block",
        opacity: .6
    },

    submit: {
        marginTop: theme.spacing(1)
    }
}))

function RegisterForm({ onRegister }) {
    const context = useContext(AppContext)

    const classes = useStyles()
    
    const formObject = useForm()
    const { handleSubmit, setError } = formObject

    const onSubmit = (values) => {
        if (values.password !== values.password_confirmation) {
            setError("password_confirmation", {
                message: "The passwords do not match"
            })
        }

        apiRegister(values)
            .then(res => {
                context.set({
                    auth: {
                        token: res.data.token,
                        user: res.data.user,
                        isLoggedIn: true
                    }
                })
                
                if (onRegister) {
                    onRegister()
                }
            })
            .catch(res => {
                const errors = res.response.data

                for (let name in errors) {
                    const { message, constraints } = errors[name]
                    const constructedMessage = message + (constraints ? ` (${constraints})` : "")

                    setError(name, {
                        message: constructedMessage
                    })
                }
            })
    }

    return (
        <FormProvider {...formObject}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Username */}
                <Input
                    name="username"
                    label="Username"
                />

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

                {/* Password Confirmation */}
                <Input
                    type="password"
                    name="password_confirmation"
                    label="Confirm Password"
                />

                <Typography variant="caption" className={classes.legal}>
                    By clicking on "Sign Up", you aggree to both our <span className={classes.link} onClick={() => context.openDialog("Terms")}>Terms and Conditions</span> and <span className={classes.link} onClick={() => context.openDialog("Privacy")}>Privacy Policy</span>.
                </Typography>

                <Button
                    type="submit"
                    fullWidth
                    className={classes.submit}
                >Sign Up</Button>
            </form>
        </FormProvider>
    )
}

export default RegisterForm