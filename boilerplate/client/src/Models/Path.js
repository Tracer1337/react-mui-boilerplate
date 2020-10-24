import { PIXEL_RATIO } from "../config/constants.js"

const defaultValues = {
    color: "black",
    width: 5
}

class Path {
    constructor({ color, width } = {}) {
        this.points = []
        this.color = color || defaultValues.color
        this.width = (width || defaultValues.width) * PIXEL_RATIO
    }

    getPoints() {
        return this.points
    }

    addPoint([x, y]) {
        this.points.push([x * PIXEL_RATIO, y * PIXEL_RATIO])
    }

    setColor(color) {
        this.color = color
    }

    setWidth(width) {
        this.width = width * PIXEL_RATIO
    }
}

export default Path