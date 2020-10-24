import React, { useEffect } from "react"
import { Dialog, DialogTitle, Button, TextField, FormGroup } from "@material-ui/core"
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

    applyButton: {
        marginTop: theme.spacing(2)
    },

    input: {
        marginTop: theme.spacing(1)
    }
}))

function BorderDialog({ onClose, open, values }) {
    const { register, getValues, handleSubmit, control, watch, reset, setValue } = useForm()

    const classes = useStyles()

    const handleClose = () => {
        const values = getValues()

        onClose(values)
    }

    useEffect(() => {
        reset(values)
    }, [values, reset])

    return (
        <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Set Border</DialogTitle>

                <FormProvider {...{ control, watch, register, setValue }}>
                    <form onSubmit={handleSubmit(handleClose)} className={classes.form}>
                        <FormGroup>
                            {/* Size */}
                            <TextField
                                inputRef={register()}
                                className={classes.input}
                                fullWidth
                                type="number"
                                name="size"
                                label="Size (px)"
                            />

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

                            {/* Top */}
                            <Switch name="top" label="Top" className={classes.input}/>

                            {/* Bottom */}
                            <Switch name="bottom" label="Bottom" className={classes.input}/>

                            {/* Left */}
                            <Switch name="left" label="Left" className={classes.input}/>

                            {/* Right */}
                            <Switch name="right" label="Right" className={classes.input}/>

                            <Button fullWidth className={classes.applyButton} type="submit">Apply</Button>
                        </FormGroup>
                    </form>
            </FormProvider>
        </Dialog>
    )
}

export default BorderDialog