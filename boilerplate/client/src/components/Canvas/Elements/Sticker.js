import React, { useState, useRef, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"

import { AppContext } from "../../../App.js"
import makeElement from "./makeElement.js"

const defaultSettings = {
    keepAspectRatio: true,
    flip: false
}

const useStyles = makeStyles(theme => ({
    image: {
        zIndex: 1,
        cursor: "move"
    }
}))

function Sticker({ data: { defaultValues, src }, id, onFocus, dimensions, handle }, forwardedRef) {
    src = defaultValues?.src || src

    const context = useContext(AppContext)

    const classes = useStyles()

    const imageRef = useRef()

    const [settings, setSettings] = useState({...defaultSettings, ...defaultValues?.settings})

    const styles = {
        width: dimensions.width + "px",
        height: dimensions.height + "px",
        transform: `scaleX(${settings.flip ? "-1" : "1"})`
    }

    if(handle) {
        handle.onSettingsClicked = () => {
            const dialogHandle = context.openDialog("ImageSettings", { values: settings, src })

            dialogHandle.addEventListener("close", (values) => {
                if (values) {
                    setSettings(values)
                }
            })
        }

        handle.getValues = () => ({ src, settings })

        if(settings.keepAspectRatio) {
            Object.defineProperty(handle, "aspectRatio", { 
                get: function() {
                    return imageRef.current?.naturalHeight / imageRef.current?.naturalWidth
                },
                configurable: true
            })
        } else {
            delete handle.aspectRatio
        }
    }

    return (
        <img
            src={src}
            alt=""
            id={`element-${id}`}
            ref={ref => {
                forwardedRef.current = ref
                imageRef.current = ref
            }}
            onMouseDown={onFocus}
            onTouchStart={onFocus}
            style={styles}
            className={classes.image}
            draggable="false"
        />
    )
}

export default makeElement({
    controls: ["resize", "rotate", "remove", "settings", "clone", "layers"],
    defaultValues: {
        width: 100
    },
    Child: React.forwardRef(Sticker)
})