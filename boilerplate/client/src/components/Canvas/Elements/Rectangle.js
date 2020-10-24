import React, { useState, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"

import { AppContext } from "../../../App.js"
import settingsOptions from "../../../config/settings-options.json"
import makeElement from "./makeElement.js"

const defaultSettings = {
    backgroundColor: "transparent",
    borderColor: settingsOptions.colors["Red"],
    borderWidth: 5,
    circle: false
}

const useStyles = makeStyles(theme => ({
    rectangle: props => ({
        zIndex: 1,
        cursor: "move",
        borderStyle: "solid",
        ...props.settings,
        borderWidth: parseInt(props.settings.borderWidth),
        borderRadius: props.settings.circle && "50%"
    })
}))

function Rectangle({ id, onFocus, dimensions, handle, data: { defaultValues } }, forwardedRef) {
    const context = useContext(AppContext)

    const [settings, setSettings] = useState({ ...defaultSettings, ...defaultValues?.settings })
    
    const classes = useStyles({ settings })

    const styles = {
        width: dimensions.width + "px",
        height: dimensions.height + "px"
    }

    if (handle) {
        handle.onSettingsClicked = () => {
            const dialogHandle = context.openDialog("RectangleSettings", { values: settings })

            dialogHandle.addEventListener("close", (values) => {
                if (values) {
                    setSettings(values)
                }
            })
        }
        handle.getValues = () => ({ settings })
    }

    return (
        <div
            id={`element-${id}`}
            ref={forwardedRef}
            style={styles}
            className={classes.rectangle}
            draggable="false"
            onMouseDown={onFocus}
            onTouchStart={onFocus}
        />
    )
}

export default makeElement({
    controls: ["resize", "rotate", "remove", "settings", "clone", "layers"],
    defaultValues: {
        width: 100,
        height: 75
    },
    Child: React.forwardRef(Rectangle)
})