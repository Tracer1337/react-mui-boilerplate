import React, { useContext, useState } from "react"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import PaletteIcon from "@material-ui/icons/Palette"

import { AppContext } from "../../App.js"
import settingsOptions from "../../config/settings-options.json"
import useBackButton from "../../utils/useBackButton.js"

const useStyles = makeStyles(theme => ({
    drawingActions: {
        pointerEvents: "none",
        display: "flex",
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1)
    },

    fab: {
        transition: theme.transitions.create() + " !important",
        width: 40,
        height: 40
    },

    selected: {
        border: `2px solid ${theme.palette.common.white}`
    },

    lineWidthAction: {
        borderRadius: "50%",
        transition: theme.transitions.create()
    }
}))

function LineWidthIcon({ value, isOption }) {
    const theme = useTheme()

    const classes = useStyles()

    return (
        <div
            className={classes.lineWidthAction}
            style={{
                width: value + "px",
                height: value + "px",
                backgroundColor: isOption ? theme.palette.common.white : theme.palette.common.black
            }}
        />
    )
}

function DrawingActions() {
    const context = useContext(AppContext)

    const classes = useStyles()

    const [isWidthDialOpen, setIsWidthDialOpen] = useState(false)
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)

    useBackButton(context.drawing.enabled, () => context.set({
        drawing: {
            enabled: false
        }
    }))

    const handleLineWidthClick = (value) => {
        context.set({
            drawing: {
                lineWidth: value
            }
        })

        setIsWidthDialOpen(false)
    }

    const handleColorClick = (color) => {
        context.set({
            drawing: {
                color
            }
        })

        setIsPaletteOpen(false)
    }
    
    return (
        <div className={classes.drawingActions}>
            {/* Line Width */}
            <SpeedDial
                ariaLabel="Line Width"
                hidden={!context.drawing.enabled}
                open={isWidthDialOpen}
                icon={<LineWidthIcon value={context.drawing.lineWidth}/>}
                onOpen={() => setIsWidthDialOpen(true)}
                onClose={() => setIsWidthDialOpen(false)}
                direction="down"
                classes={{ fab: classes.fab }}
            >
                {settingsOptions.lineWidth.map((value, i) => (
                    <SpeedDialAction
                        key={i}
                        tooltipTitle={value + "px"}
                        onClick={() => handleLineWidthClick(value)}
                        classes={{ fab: context.drawing.lineWidth === value && classes.selected }}
                        icon={<LineWidthIcon value={value} isOption/>}
                    />
                ))}
            </SpeedDial>

            {/* Palette */}
            <SpeedDial
                ariaLabel="Palette"
                hidden={!context.drawing.enabled}
                open={isPaletteOpen}
                icon={<PaletteIcon />}
                onOpen={() => setIsPaletteOpen(true)}
                onClose={() => setIsPaletteOpen(false)}
                direction="down"
                classes={{ fab: classes.fab }}
                FabProps={{
                    style: { backgroundColor: context.drawing.color }
                }}
            >
                {Object.entries(settingsOptions.colors).reverse().map(([label, color], i) => (
                    <SpeedDialAction
                        key={i}
                        tooltipTitle={label}
                        icon={<></>}
                        onClick={() => handleColorClick(color)}
                        classes={{ fab: context.drawing.color === color && classes.selected }}
                        FabProps={{
                            style: { backgroundColor: color }
                        }}
                    />
                ))}
            </SpeedDial>
        </div>
    )
}

export default DrawingActions