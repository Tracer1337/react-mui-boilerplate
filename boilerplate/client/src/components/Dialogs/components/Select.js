import React from "react"
import { TextField, MenuItem } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"

function Select({ name, label, options, child, className }) {
    const { control, watch } = useFormContext()

    return (
        <Controller
            as={props => (
                <TextField
                    select
                    label={label}
                    fullWidth
                    className={className}
                    value={watch(name)}
                    {...props}
                >
                    {Object.entries(options).map(([label, value]) => (
                        <MenuItem key={value} value={value}>
                            {React.createElement(child, { label, value })}
                        </MenuItem>
                    ))}
                </TextField>
            )}
            control={control}
            name={name}
        />
    )
}

export default Select