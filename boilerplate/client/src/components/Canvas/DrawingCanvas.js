import React, { useState, useEffect, useRef, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"

import { AppContext } from "../../App.js"
import useSnapshots from "../../utils/useSnapshots.js"
import { createListeners } from "../../utils"
import Path from "../../Models/Path.js"
import { PIXEL_RATIO } from "../../config/constants.js"

const useStyles = makeStyles(theme => ({
    drawingCanvas: {
        position: "absolute",
        top: 0,
        pointerEvents: props => !props.enabled && "none",
        zIndex: 1000
    }
}))

function DrawingCanvas({ canvas, border }) {
    const context = useContext(AppContext)
    
    const classes = useStyles(context.drawing)

    const drawingCanvasRef = useRef()
    const renderContext = useRef()
    const paths = useRef([])
    const currentPath = useRef(new Path())
    const isUsingTouchEvents = useRef(false)

    const [isDrawing, setIsDrawing] = useState(false)

    const addSnapshot = useSnapshots({
        createSnapshot: () => ({ paths: [...paths.current] }),

        applySnapshot: (snapshot) => {
            paths.current = snapshot.paths
            draw()
        }
    })

    const setDimensions = () => {
        const canvasRect = canvas.getBoundingClientRect()

        drawingCanvasRef.current.width = canvasRect.width * PIXEL_RATIO
        drawingCanvasRef.current.height = canvasRect.height * PIXEL_RATIO

        drawingCanvasRef.current.style.width = canvasRect.width + "px"
        drawingCanvasRef.current.style.height = canvasRect.height + "px"
    }

    const handleTouchStart = (event) => {
        isUsingTouchEvents.current = true
        handleDrawStart(event.touches[0])
    }
    
    const handleTouchMove = (event) => {
        // This line is neccessary for performance reasons
        event.preventDefault()
        handleDraw(event.touches[0])
    }

    const handleMouseDown = (event) => {
        if (!isUsingTouchEvents.current) {
            handleDrawStart(event)
        }
    }

    const handleMouseMove = (event) => {
        if (isDrawing && !isUsingTouchEvents.current) {
            handleDraw(event)
        }
    }

    const handleMouseUp = () => {
        if (!isUsingTouchEvents.current) {
            handleDrawEnd()
        }
    }

    const handleDraw = ({ clientX, clientY }) => {
        const canvasRect = canvas.getBoundingClientRect()
        const x = clientX - canvasRect.x
        const y = clientY - canvasRect.y

        currentPath.current.addPoint([x, y])
        draw()
    }
    
    const handleDrawStart = (event) => {
        currentPath.current = new Path({
            color: context.drawing.color,
            width: context.drawing.lineWidth
        })

        setIsDrawing(true)
        addSnapshot()
        handleDraw(event)
    }
    
    const handleDrawEnd = () => {
        paths.current.push(currentPath.current)
        currentPath.current = null

        setIsDrawing(false)
    }

    const handleResetCanvas = () => {
        paths.current = []
        draw()
    }

    const clearCanvas = () => {
        renderContext.current.clearRect(0, 0, drawingCanvasRef.current.width, drawingCanvasRef.current.height)
    }

    const drawPath = () => {
        const context = renderContext.current

        for (let path of paths.current.concat([currentPath.current || new Path()])) {
            context.beginPath()

            context.fillStyle = path.color
            context.strokeStyle = path.color
            context.lineWidth = path.width
            context.lineCap = "round"

            const points = path.getPoints()

            for (let i = 0; i < points.length; i++) {
                const [x, y] = points[i]
                
                // Draw circle at the beginning
                if (i === 0) {
                    context.moveTo(x, y)
                    context.arc(x, y, path.width / 2, 0, Math.PI * 2, false)
                    context.fill()
                    context.beginPath()
                }

                // Draw a line from the last point to this point
                context.lineTo(x, y)
            }

            context.stroke()
        }
    }

    const draw = () => {
        clearCanvas()
        drawPath()
    }

    useEffect(() => {
        if (!canvas) {
            return
        }
        
        setDimensions()
        draw()

        // eslint-disable-next-line
    }, [canvas?.clientWidth, canvas?.clientHeight, border])

    useEffect(() => {
        currentPath.current.setColor(context.drawing.color)
        currentPath.current.setWidth(context.drawing.lineWidth)
    }, [context.drawing])

    useEffect(() => {
        const drawingCanvas = drawingCanvasRef.current

        renderContext.current = drawingCanvas.getContext("2d")

        const events = [
            ["touchstart", handleTouchStart],
            ["touchend", handleDrawEnd],
            ["touchcancel", handleDrawEnd],
            ["touchmove", handleTouchMove],

            ["mousedown", handleMouseDown],
            ["mouseup", handleMouseUp],
            ["mousemove", handleMouseMove]
        ]

        const removeListeners = createListeners(drawingCanvas, events)

        context.addEventListener("resetCanvas", handleResetCanvas)
        
        return () => {
            removeListeners()
            context.removeEventListener("resetCanvas", handleResetCanvas)
        }
    })

    return (
        <canvas
            ref={drawingCanvasRef}
            className={classes.drawingCanvas}
        />
    )
}

export default DrawingCanvas