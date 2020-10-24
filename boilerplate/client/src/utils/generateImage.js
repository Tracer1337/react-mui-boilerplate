import html2canvas from "html2canvas"

import { TEXTBOX_PADDING } from "../config/constants.js"

function compensateError(clonedDocument) {
    /**
     * Compensate down shifting
     */
    const textboxes = clonedDocument.querySelectorAll(".textbox")
    const padding = TEXTBOX_PADDING

    textboxes.forEach(textbox => {
        const shiftOffset = Math.min(textbox.offsetHeight / 18, padding)
        textbox.style.padding = `${padding - shiftOffset}px ${padding}px ${padding + shiftOffset}px`
    })

    /**
     * Compensate font error
     */
    textboxes.forEach(textbox => {
        textbox.style.fontFeatureSettings = '"liga" 0'
    })

    /**
     * Remove white border
     */
    const image = clonedDocument.querySelector(".base-element")
    image.style.minWidth = (image.clientWidth + 1) + "px"
    image.style.minHeight = (image.clientHeight + 1) + "px"
}

async function generateImage(container) {
    const canvas = await html2canvas(container, {
        useCORS: true,
        onclone: compensateError
    })

    return canvas.toDataURL()
}

export default generateImage