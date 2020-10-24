import React, { useEffect } from "react"
import { Dialog, Button, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useForm, FormProvider } from "react-hook-form"

import Select from "./components/Select.js"
import Switch from "./components/Switch.js"

import settingsOptions from "../../config/settings-options.json"

const useStyles = makeStyles(theme => ({
    form: {
        padding: theme.spacing(2),
        paddingTop: 0
    },

    rectangle: props => ({
        height: 75,
        margin: theme.spacing(2),
        borderStyle: "solid",
        ...props.settings,
        borderWidth: parseInt(props.settings.borderWidth),
        borderRadius: props.settings.circle && "50%"
    }),

    applyButton: {
        marginTop: theme.spacing(2)
    },

    input: {
        marginTop: theme.spacing(1)
    }
}))

function RectangleSettingsDialog({ onClose, open, values, text }) {
    const { getValues, handleSubmit, control, watch, reset, register, setValue } = useForm()

    const classes = useStyles({ settings: watch() })

    const handleClose = () => {
        onClose(getValues())
    }

    useEffect(() => {
        reset(values)
    }, [values, reset])

    return (
        <Dialog onClose={handleClose} open={open}>
            <div className={classes.rectangle}/>

            <FormProvider {...{ control, watch, register, setValue }}>
                <form onSubmit={handleSubmit(handleClose)} className={classes.form}>

                    {/* Background Color */}
                    <Select
                        name="backgroundColor"
                        label="Background Color"
                        options={{
                            "None": "transparent",
                            ...settingsOptions.colors
                        }}
                        className={classes.input}
                        child={({ label, value }) => (
                            <span style={{ color: value !== "transparent" && value }}>{label}</span>
                        )}
                    />

                    {/* Border Color */}
                    <Select
                        name="borderColor"
                        label="Border Color"
                        options={{
                            "None": "transparent",
                            ...settingsOptions.colors
                        }}
                        className={classes.input}
                        child={({ label, value }) => (
                            <span style={{ color: value !== "transparent" && value }}>{label}</span>
                        )}
                    />

                    {/* Border Width */}
                    <TextField
                        inputRef={register()}
                        name="borderWidth"
                        label="Border Width"
                        className={classes.input}
                        type="number"
                        fullWidth
                    />

                    {/* Circle */}
                    <Switch name="circle" label="Circle" className={classes.input} />

                    <Button fullWidth className={classes.applyButton} type="submit">Apply</Button>
                </form>
            </FormProvider>
        </Dialog>
    )
}

export default RectangleSettingsDialog