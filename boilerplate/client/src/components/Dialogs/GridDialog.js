import React, { useState, useEffect } from "react"
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

function GridDialog({ onClose, open, values }) {
    const { register, getValues, handleSubmit, control, watch, reset, setValue } = useForm()

    const classes = useStyles()

    const [spacingError, setSpacingError] = useState(false)

    const handleClose = () => {
        const values = getValues()

        // Missing value "Spacing"
        if(values.fixedSpacing && !values.spacing) {
            setSpacingError(true)
            return
        } else {
            setSpacingError(false)
        }

        values.spacing = parseInt(values.spacing)

        onClose(values)
    }

    useEffect(() => {
        reset(values)
    }, [values, reset])

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set Grid</DialogTitle>

            <FormProvider {...{ control, watch, register, setValue }}>
                <form onSubmit={handleSubmit(handleClose)} className={classes.form}>
                    <FormGroup>
                        {/* Enabled */}
                        <Switch name="enabled" label="Enabled" className={classes.input}/>

                        {/* Use Fixed Spacing */}
                        <Switch name="fixedSpacing" label="Fixed Spacing" className={classes.input}/>

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

                        {/* Columns */}
                        <TextField
                            inputRef={register()}
                            className={classes.input}
                            fullWidth
                            type="number"
                            name="columns"
                            label="Columns"
                        />

                        {/* Rows */}
                        <TextField
                            inputRef={register()}
                            className={classes.input}
                            fullWidth
                            type="number"
                            name="rows"
                            label="Rows"
                        />

                        {/* Spacing */}
                        <TextField
                            inputRef={register()}
                            className={classes.input}
                            fullWidth
                            type="number"
                            name="spacing"
                            label="Spacing (px)"
                            error={spacingError}
                        />

                        <Button fullWidth className={classes.applyButton} type="submit">Apply</Button>
                    </FormGroup>
                </form>
            </FormProvider>
        </Dialog>
    )
}

export default GridDialog