import React from "react"
import { Switch, FormControlLabel } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useFormContext } from "react-hook-form"

const useStyles = makeStyles(theme => ({
    switch: {
        width: "100%"
    }
}))

function Select({ name, label, className }) {
    const { register, watch, setValue } = useFormContext()

    const classes = useStyles()

    return (
        <FormControlLabel
            control={
                <Switch
                    name={name}
                    inputRef={register()}
                    onChange={(event, value) => setValue(name, value)}
                    checked={watch(name)}
                />
            }
            label={label}
            className={`${classes.switch} ${className}`}
        />
    )
}

export default Select