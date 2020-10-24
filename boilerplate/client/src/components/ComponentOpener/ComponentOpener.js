import React, { useState, useEffect, useContext, useReducer } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useTheme } from "@material-ui/core"

import { AppContext } from "../../App.js"
import { createListeners } from "../../utils"
import createDialogOpener from "./dialog.js"
import createSnackbarOpener from "./snackbar.js"

const openers = {
    Dialog: createDialogOpener,
    Snackbar: createSnackbarOpener
}

function ComponentOpener() {
    const context = useContext(AppContext)

    const history = useHistory()

    const location = useLocation()

    const theme = useTheme()

    const [components, setComponents] = useState([])

    // eslint-disable-next-line
    const [updateKey, update] = useReducer(key => key + 1, 0)

    const close = (component) => {
        component.isOpen = false
        setComponents([...components])

        setTimeout(() => context.dispatchEvent("removeComponent", component), theme.transitions.duration.leavingScreen)
    }

    const closeAll = () => {
        components.forEach(component => component.isOpen = false)
        setComponents([...components])

        setTimeout(() => context.dispatchEvent("removeAllComponent"), theme.transitions.duration.leavingScreen)
    }

    const remove = (component) => {
        const newComponent = components.filter(({ id }) => component.id !== id)
        setComponents(newComponent)
    }

    const removeAll = () => {
        setComponents([])
    }

    useEffect(() => {
        const open = (handle) => {
            history.push(history.location.pathname)
            const entry = history.entries[history.entries.length - 1]

            handle.historyKey = entry.key

            setComponents([...components, handle])

            return handle
        }

        for (let name in openers) {
            context["open" + name] = openers[name](open)
        }

        const removeListeners = components.map(component => createListeners(component, [
            ["update", update],
            ["close", history.goBack]
        ]))

        return () => removeListeners.forEach(fn => fn())
    })

    useEffect(() => {
        components.forEach(component => {
            for (let i = 0; i <= history.index; i++) {
                if (history.entries[i].key === component.historyKey) {
                    return
                }
            }

            close(component)
        })

        // eslint-disable-next-line
    }, [location])

    useEffect(() => {
        return createListeners(context, [
            ["loadTemplate", closeAll],
            ["logout", closeAll],
            ["removeComponent", remove],
            ["removeAllComponent", removeAll]
        ])
    })

    return components.map((component) => (
        React.createElement(component.component, {
            open: component.isOpen,
            onClose: data => component.dispatchEvent("close", data),
            key: component.id,
            ...component.data
        })
    ))
}

export default ComponentOpener