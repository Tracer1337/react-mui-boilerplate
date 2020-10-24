import { TEXTBOX_PADDING } from "../config/constants.js"
import { textShadow } from "./index.js"

function getTextboxStyles({ theme, props }) {
    return {
        border: "none",
        fontSize: 24,
        resize: "none",
        whiteSpace: "pre-wrap",
        zIndex: 10,
        padding: TEXTBOX_PADDING,
        display: "flex",
        flexDirection: "column",

        outline: !props.capture && props.isFocused ? "1px dashed gray" : "none",
        userSelect: !props.isEditing && "none",
        cursor: !props.isEditing && "move",

        backgroundColor: props.settings.backgroundColor,
        color: props.settings.color,
        fontFamily: props.settings.fontFamily,
        textTransform: props.settings.caps && "uppercase",
        fontWeight: props.settings.bold && "bold",
        textShadow: textShadow(parseInt(props.settings.textOutlineWidth), props.settings.textOutlineColor),
        textAlign: props.settings.textAlign,
        justifyContent: (
            props.settings.verticalTextAlign === "top" ? "flex-start" :
            props.settings.verticalTextAlign === "bottom" ? "flex-end" :
            props.settings.verticalTextAlign === "center" ? "center" :
            null
        )
    }
}

export default getTextboxStyles