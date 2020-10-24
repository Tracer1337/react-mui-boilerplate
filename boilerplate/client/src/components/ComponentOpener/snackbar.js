import React from "react"
import { Snackbar, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/Close"

import ComponentHandle from "../../Models/ComponentHandle.js"

const useStyles = makeStyles(theme => ({
    closeButton: {
        color: theme.palette.primary.variant
    }
}))

function CloseButton({ onClose }) {
    const classes = useStyles()

    return (
        <IconButton onClick={onClose} className={classes.closeButton}>
            <CloseIcon />
        </IconButton>
    )
}

function createOpener(open) {
    return function openSnackbar(message) {
        const newComponent = new ComponentHandle({
            component: Snackbar,
            data: {
                message,
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
                autoHideDuration: 3000
            }
        })

        newComponent.set({
            action: <CloseButton onClose={() => newComponent.dispatchEvent("close")}/>
        })

        return open(newComponent)
    }
}

export default createOpener