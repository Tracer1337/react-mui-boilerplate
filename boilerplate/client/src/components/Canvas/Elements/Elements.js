import React, { useEffect, useRef, useContext, useImperativeHandle } from "react"
import { makeStyles } from "@material-ui/core/styles"

import Textbox from "./Textbox.js"
import Sticker from "./Sticker.js"
import Rectangle from "./Rectangle.js"
import Element from "../../../Models/Element.js"
import { ELEMENT_TYPES } from "../../../config/constants.js"
import { createListeners, fileToImage, importFile } from "../../../utils"
import { AppContext } from "../../../App.js"
import useSnapshots from "../../../utils/useSnapshots.js"

const useStyles = makeStyles(theme => ({
    elements: {
        position: "absolute",
        top: 0, left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: props => props.context.isEmptyState && "none"
    }
}))

function Elements({ base, grid, canvas }, ref) {
    const context = useContext(AppContext)

    const classes = useStyles({ context })

    const idCounter = useRef(0)
    const elementRefs = useRef({})

    elementRefs.current = {}
    for (let element of context.elements) {
        elementRefs.current[element.id] = {}
    }

    const addSnapshot = useSnapshots({
        createSnapshot: () => ({ elements: [...context.elements] }),

        applySnapshot: (snapshot) => {
            context.set({ elements: snapshot.elements })
        }
    })

    const addElement = (element) => {
        context.set({
            elements: [...context.elements, element]
        })
    }

    const setElements = (elements) => {
        context.set({ elements })
    }

    const handleRemoveElement = (elementId) => {
        const newElements = context.elements.filter(({ id }) => id !== elementId)
        setElements(newElements)
    }

    const handleTemporaryRemoveElement = (elementId) => {
        const element = context.elements.find(({ id }) => id === elementId)
        element.data.isRemoved = true
        setElements([...context.elements])
    }

    const handleUndoRemoveElement = (elementId) => {
        const element = context.elements.find(({ id }) => id === elementId)
        element.data.isRemoved = false
        setElements([...context.elements])
    }

    const handleCloneElement = (elementId) => {
        const element = context.elements.find(({ id }) => id === elementId)

        const newElement = createNewElement(element.type, {
            defaultValues: elementRefs.current[element.id].getValues()
        })

        context.set({
            elements: [...context.elements, newElement],
            focus: {
                element: newElement
            }
        })
    }

    const handleToFront = (elementId) => {
        addSnapshot()
        const index = context.elements.findIndex(({ id }) => id === elementId)
        const element = context.elements.splice(index, 1)[0]
        context.set({ elements: [...context.elements, element] })
    }
    
    const handleToBack = (elementId) => {
        addSnapshot()
        const index = context.elements.findIndex(({ id }) => id === elementId)
        const element = context.elements.splice(index, 1)[0]
        context.set({ elements: [element, ...context.elements] })
    }

    const handleFocus = (elementId) => {
        const element = context.elements.find(({ id }) => id === elementId)
        const controls = elementRefs.current[elementId].getControls()
        
        context.set({
            focus: {
                element,
                controls
            }
        })
    }

    const handleBlur = () => {
        context.set({ focus: null })
    }

    const createNewElement = (type, data = {}) => {
        const newElement = new Element({
            type,
            data,
            id: idCounter.current++
        })

        return newElement
    }

    const handleAddTextbox = ({ data }) => {
        addElement(createNewElement("textbox", data))
    }

    const handleAddRectangle = () => {
        addElement(createNewElement("rectangle"))
    }

    const addSticker = (src, id) => {
        addElement(createNewElement("sticker", { src, id }))
    }

    const handleImportSticker = async () => {
        const file = await importFile("image/*")
        const base64Image = await fileToImage(file)
        addSticker(base64Image)
    }

    const handleLoadSticker = ({ sticker }) => {
        addSticker(sticker.image_url, sticker.id)
    }

    const handleGetTextboxes = () => {
        const textboxIds = context.elements.filter(({ type }) => type === "textbox").map(({ id }) => id)
        const formatted = textboxIds.map(id => elementRefs.current[id].toObject({ image: base }))
        return formatted
    }

    const beforeCapturing = () => {
        Object.values(elementRefs.current).forEach(element => element.beforeCapturing())
    }

    const afterCapturing = () => {
        Object.values(elementRefs.current).forEach(element => element.afterCapturing())
    }

    useEffect(() => {
        window.getTextboxes = handleGetTextboxes

        return createListeners(context, [
            ["importSticker", handleImportSticker],
            ["addTextbox", handleAddTextbox],
            ["addRectangle", handleAddRectangle],
            ["loadSticker", handleLoadSticker],
        ])
    })

    useImperativeHandle(ref, () => ({
        createId: () => idCounter.current++,
        beforeCapturing,
        afterCapturing
    }))

    return (
        <div className={classes.elements}>
            {context.elements.map(({ type, id, data }) => {
                const props = {
                    key: id, id, data, grid, canvas,
                    onRemove: handleRemoveElement,
                    onTemporaryRemove: handleTemporaryRemoveElement,
                    onUndoRemove: handleUndoRemoveElement,
                    onClone: handleCloneElement,
                    onToFront: handleToFront,
                    onToBack: handleToBack,
                    onFocus: handleFocus,
                    onBlur: handleBlur,
                    isFocused: context.focus?.element.id === id,
                    handle: elementRefs.current[id]
                }

                if (type === ELEMENT_TYPES["TEXTBOX"]) {
                    return (
                        <Textbox {...props} />
                    )
                } else if (type === ELEMENT_TYPES["STICKER"]) {
                    return (
                        <Sticker {...props} />
                    )
                } else if (type === ELEMENT_TYPES["RECTANGLE"]) {
                    return (
                        <Rectangle {...props} />
                    )
                } else {
                    return null
                }
            })}
        </div>
    )
}

export default React.forwardRef(Elements)