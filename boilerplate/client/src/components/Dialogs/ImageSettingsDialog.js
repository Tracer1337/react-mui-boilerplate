import React, { useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Dialog, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Switch from "./components/Switch.js"

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
    },

    image: {
        width: 100
    },

    imageWrapper: {
        width: "100%",
        textAlign: "center",
        padding: theme.spacing(1),
        boxSizing: "border-box"
    }
}))

function ImageSettingsDialog({ onClose, open, values, src }) {
    const { getValues, handleSubmit, control, watch, reset, register, setValue } = useForm()


    const classes = useStyles()

    const handleClose = () => {
        onClose(getValues())
    }

    useEffect(() => {
        reset(values)
    }, [values, reset])

    return (
        <Dialog onClose={handleClose} open={open}>
            <div className={classes.imageWrapper}>
                <img src={src} alt="" className={classes.image} style={{
                    transform: `scaleX(${watch("flip") ? "-1" : "1"})`
                }}/>
            </div>

            <FormProvider {...{ control, watch, register, setValue }}>
                <form onSubmit={handleSubmit(handleClose)} className={classes.form}>
                    {/* Keep Aspect Ratio */}
                    <Switch name="keepAspectRatio" label="Keep Aspect Ratio" className={classes.input} />

                    {/* Flip */}
                    <Switch name="flip" label="Flip" className={classes.input} />

                    <Button fullWidth className={classes.applyButton} type="submit">Apply</Button>
                </form>
            </FormProvider>
        </Dialog>
    )
}

export default ImageSettingsDialog