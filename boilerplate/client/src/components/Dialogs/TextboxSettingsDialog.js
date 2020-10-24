import React, { useEffect } from "react"
import { Dialog, Button, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useForm, FormProvider } from "react-hook-form"

import Select from "./components/Select.js"
import Switch from "./components/Switch.js"

import settingsOptions from "../../config/settings-options.json"
import getTextboxStyles from "../../utils/getTextboxStyles.js"

const useStyles = makeStyles(theme => ({
    form: {
        padding: theme.spacing(2),
        paddingTop: 0
    },

    text: props => ({
        ...getTextboxStyles({ theme, props }),
        padding: theme.spacing(2),
        minHeight: 40
    }),

    applyButton: {
        marginTop: theme.spacing(2)
    },

    input: {
        marginTop: theme.spacing(1)
    }
}))

function TextboxSettingsDialog({ onClose, open, values, text }) {
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
            <div className={classes.text}>
                {text}
            </div>
            
            <FormProvider {...{ control, watch, register, setValue }}>
                <form onSubmit={handleSubmit(handleClose)} className={classes.form}>
                    {/* Color */}
                    <Select
                        name="color"
                        label="Color"
                        options={settingsOptions.colors}
                        className={classes.input}
                        child={({ label, value }) => (
                            <span style={{ color: value }}>{label}</span>
                        )}
                    />

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

                    {/* Text Outline Width */}
                    <TextField
                        inputRef={register()}
                        name="textOutlineWidth"
                        label="Outline Width"
                        className={classes.input}
                        type="number"
                        fullWidth
                    />

                    {/* Text Outline Color */}
                    <Select
                        name="textOutlineColor"
                        label="Outline Color"
                        options={settingsOptions.colors}
                        className={classes.input}
                        child={({ label, value }) => (
                            <span style={{ color: value }}>{label}</span>
                        )}
                    />

                    {/* Text Align */}
                    <Select
                        name="textAlign"
                        label="Horizontal Align"
                        options={settingsOptions.textAlign}
                        className={classes.input}
                        child={({ label }) => label}
                    />

                    {/* Vertical Text Align */}
                    <Select
                        name="verticalTextAlign"
                        label="Vertical Align"
                        options={settingsOptions.verticalTextAlign}
                        className={classes.input}
                        child={({ label }) => label}
                    />

                    {/* Font Family */}
                    <Select
                        name="fontFamily"
                        label="Font Family"
                        options={settingsOptions.fontFamilies}
                        className={classes.input}
                        child={({ label, value }) => (
                            <span style={{ fontFamily: value }}>{label}</span>
                        )}
                    />

                    {/* Bold */}
                    <Switch name="bold" label="Bold" className={classes.input}/>

                    {/* Caps */}
                    <Switch name="caps" label="Caps" className={classes.input}/>

                    <Button fullWidth className={classes.applyButton} type="submit">Apply</Button>
                </form>
            </FormProvider>
        </Dialog>
    )
}

export default TextboxSettingsDialog