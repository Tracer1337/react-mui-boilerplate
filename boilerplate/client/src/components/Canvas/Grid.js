import React, { useEffect, useRef, useContext } from "react"
import { makeStyles } from "@material-ui/core"

import { AppContext } from "../../App.js"

function line(context, x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
}

const useStyles = makeStyles(theme => ({
    canvas: {
        position: "absolute",
        pointerEvents: "none",
        touchAction: "none"
    }
}))

function Grid({ config, canvas, border }) {
    const classes = useStyles()

    const context = useContext(AppContext)

    const grid = useRef()

    let renderContext

    const setDimensions = async () => {
        // Wait until canvas has resized proberly
        await new Promise(requestAnimationFrame)

        const canvasRect = canvas.getBoundingClientRect()

        grid.current.width = canvasRect.width
        grid.current.height = canvasRect.height
    }

    const render = (cellWidth, cellHeight) => {
        for (let x = 0; x < grid.current.width; x += cellWidth) {
            line(renderContext, x, 0, x, grid.current.height)
        }

        for (let y = 0; y < grid.current.height; y += cellHeight) {
            line(renderContext, 0, y, grid.current.width, y)
        }
    }

    // Render a dynamic amount of columns / rows with a fixed size
    const renderWithFixedSpacing = () => {
        if(!config.spacing) {
            return
        }

        render(config.spacing, config.spacing)
    }

    // Render a fixed amount of columns / rows with a dynamic size
    const renderWithRelativeSpacing = () => {
        if(!config.columns || !config.rows || !canvas) {
            return
        }

        const cellWidth = canvas.clientWidth / config.columns
        const cellHeight = canvas.clientHeight / config.rows

        render(cellWidth, cellHeight)
    }

    const renderGrid = () => {
        renderContext = grid.current.getContext("2d")

        renderContext.strokeStyle = config.color

        if(config.fixedSpacing) {
            renderWithFixedSpacing()
        } else {
            renderWithRelativeSpacing()
        }
    }

    useEffect(() => {
        if(!canvas) {
            return
        }

        setDimensions().then(renderGrid)

        // eslint-disable-next-line
    }, [canvas, config, context.rootElement, border])

    return (
        <canvas
            ref={grid}
            style={{ display: !config.enabled && "none" }}
            className={classes.canvas}
        />
    )
}

export default Grid