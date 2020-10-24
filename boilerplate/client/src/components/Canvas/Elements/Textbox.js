import React, { useState, useEffect, useRef, useMemo, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"

import { AppContext } from "../../../App.js"
import useSnapshots from "../../../utils/useSnapshots.js"
import makeElement from "./makeElement.js"
import fitText from "../../../utils/fitText.js"
import getTextboxStyles from "../../../utils/getTextboxStyles.js"
import { createListeners } from "../../../utils"
import { TEXTBOX_PLACEHOLDER, TEXTBOX_PADDING } from "../../../config/constants.js"

const defaultSettings = {
    color: "white",
    textOutlineWidth: 2,
    textOutlineColor: "black",
    textAlign: "center",
    fontFamily: "'Impact', fantasy",
    backgroundColor: "transparent",
    verticalTextAlign: "center",
    bold: false,
    caps: true
}

const useStyles = makeStyles(theme => ({
    input: props => getTextboxStyles({ theme, props })
}))

function Textbox({ id, handle, onFocus, isFocused, toggleMovement, dimensions, data: { defaultValues } }, forwardedRef) {
    const context = useContext(AppContext)

    const textboxRef = useRef()
    const shouldEmitSnapshot = useRef(false)

    const [value, setValue] = useState(defaultValues?.value || TEXTBOX_PLACEHOLDER)
    const [settings, setSettings] = useState({ ...defaultSettings, ...defaultValues?.settings })
    const [isEditing, setIsEditing] = useState(false)

    const classes = useStyles({ settings, isFocused, isEditing }) 

    const addSnapshot = useSnapshots({
        createSnapshot: () => ({ value, settings }),

        applySnapshot: (snapshot) => {
            setValue(snapshot.value)
            textboxRef.current.textContent = snapshot.value
            setSettings(snapshot.settings)
        },

        onSnapshotsEmpty: () => {
            // Set initial values
            setValue(defaultValues?.value || TEXTBOX_PLACEHOLDER)
            setSettings({ ...defaultSettings, ...defaultValues?.settings })
        }
    })

    const handleSettingsClicked = () => {
        const dialogHandle = context.openDialog("TextboxSettings", { values: settings, text: value })

        dialogHandle.addEventListener("close", (values) => {
            if (values) {
                addSnapshot()
                setSettings(values)
            }
        })
    }
    
    const handleEditClicked = async () => {
        const handleFocusOut = () => {
            toggleMovement(true)
            setIsEditing(false)
            textboxRef.current.removeEventListener("focusout", handleFocusOut)
        }
        
        shouldEmitSnapshot.current = true
        toggleMovement(false)
        setIsEditing(true)
        textboxRef.current.addEventListener("focusout", handleFocusOut)

        // Wait until contenteditable is set
        await new Promise(requestAnimationFrame)

        textboxRef.current.focus()

        // Clear the placeholder
        if(value.toLowerCase() === TEXTBOX_PLACEHOLDER.toLowerCase()) {
            textboxRef.current.textContent = ""
        }
    }

    const handleValueChange = (event) => {
        if(shouldEmitSnapshot.current) {
            shouldEmitSnapshot.current = false
            addSnapshot()
        }

        const newValue = event.target.textContent
        setValue(newValue)
    }

    const toObject = ({ image }) => {
        const toPercentage = (value, useWidth = false) => value / (useWidth ? image.clientWidth : image.clientHeight) * 100 + "%"

        const changedSettings = defaultValues?.settings || {}
        for(let key in settings) {
            if(settings[key] !== defaultSettings[key]) {
                changedSettings[key] = settings[key]
            }
        }

        return {
            value,
            width: toPercentage(dimensions.width + TEXTBOX_PADDING * 2, true),
            height: toPercentage(dimensions.height + TEXTBOX_PADDING * 2),
            x: toPercentage(dimensions.x, true),
            y: toPercentage(dimensions.y),
            rotation: dimensions.rotation,
            settings: changedSettings
        }
    }

    // Expose methods for parent
    if(handle) {
        handle.toObject = toObject
        handle.onEditClicked = handleEditClicked
        handle.onSettingsClicked = handleSettingsClicked
        handle.getValues = () => ({ value, settings })
    }

    // Generate stylings for textbox
    const styles = useMemo(() => ({
        width: dimensions.width + "px",
        height: dimensions.height + "px",
        fontSize: fitText({ styles: settings, text: value, ...dimensions })
    }), [value, settings, dimensions])

    useEffect(() => {
        // Set initial value
        textboxRef.current.textContent = value

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(!isEditing && !value) {
            // Insert placeholder if textbox is empty
            setValue(TEXTBOX_PLACEHOLDER)
            textboxRef.current.textContent = TEXTBOX_PLACEHOLDER
        }

        // eslint-disable-next-line
    }, [isEditing])

    useEffect(() => {
        return createListeners(textboxRef.current, [
            ["dblclick", handleEditClicked]
        ])
    })
    
    return (
        <div
            contentEditable={isEditing}
            id={`element-${id}`}
            className={`textbox ${classes.input}`}
            style={styles}
            ref={ref => {
                textboxRef.current = ref
                forwardedRef.current = ref
            }}
            onMouseDown={onFocus}
            onTouchStart={onFocus}
            onInput={handleValueChange}
        />
    )
}

export default makeElement({
    controls: ["resize", "rotate", "edit", "settings", "remove", "clone", "layers"],
    defaultValues: {
        width: 160,
        height: 24
    },
    Child: React.forwardRef(Textbox)
})