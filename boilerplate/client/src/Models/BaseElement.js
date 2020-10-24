import { BASE_ELEMENT_TYPES } from "../config/constants.js"

class BaseElement {
    constructor({ type, ...props }) {
        this.type = type

        if (type === BASE_ELEMENT_TYPES["IMAGE"]) {
            this.image = props.image
            this.label = props.label
        }
    }
}

export default BaseElement