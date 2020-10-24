import React, { useEffect, useContext } from "react"
import { Paper } from "@material-ui/core"

import { AppContext } from "../../App.js"
import BaseElements from "../Dialogs/components/BaseElements.js"
import BaseElement from "../../Models/BaseElement.js"
import { BASE_ELEMENT_TYPES } from "../../config/constants.js"
import { createListeners } from "../../utils"

function Base(props, ref) {
    const context = useContext(AppContext)

    const handleBaseElementCreate = (baseElement) => {
        context.dispatchEvent("resetCanvas")

        context.set({
            currentTemplate: null,
            isEmptyState: false,
            elements: [],
            rootElement: baseElement
        })
    }

    const openDialog = () => context.openDialog("BaseElements", { onBaseElementCreate: handleBaseElementCreate })

    useEffect(() => {
        return createListeners(context, [
            ["openBaseSelection", openDialog]
        ])
    })

    useEffect(() => {
        // Handle image injection from chrome extension
        const handleMessage = (message) => {
            if (message.data.image) {
                handleBaseElementCreate(new BaseElement({
                    type: BASE_ELEMENT_TYPES["IMAGE"],
                    image: message.data.image,
                    label: message.data.label
                }))
            }
        }

        return createListeners(window, [
            ["message", handleMessage]
        ])
    })

    const sharedProps = {
        ref,
        className: "base-element",
        draggable: "false"
    }
    
    let baseElement

    if (context.rootElement?.type === BASE_ELEMENT_TYPES["IMAGE"]) {
        baseElement = (
            <img
                alt=""
                src={context.rootElement.image}
                {...sharedProps}
            />
        )
    } else if (context.rootElement?.type === BASE_ELEMENT_TYPES["BLANK"]) {
        baseElement = (
            <div
                {...sharedProps}
            />
        )
    } else {
        baseElement = (
            <Paper>
                <BaseElements onBaseElementCreate={handleBaseElementCreate} />
            </Paper>
        )
    }

    return baseElement
}

export default React.forwardRef(Base)