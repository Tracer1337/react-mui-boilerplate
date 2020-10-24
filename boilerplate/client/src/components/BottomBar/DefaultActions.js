import React, { useState, useRef, useContext } from "react"
import clsx from "clsx"
import { Toolbar, Fab, IconButton, Zoom as MuiZoom, Fade as MuiFade } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import DoneIcon from "@material-ui/icons/Done"
import TextFieldsIcon from "@material-ui/icons/TextFields"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"
import HelpIcon from "@material-ui/icons/Help"
import UndoIcon from "@material-ui/icons/Undo"
import CloseIcon from "@material-ui/icons/Close"

import Menu from "./Menu.js"
import { AppContext } from "../../App.js"
import helpOverlayData from "../../config/help-overlay-data.json"

const useStyles = makeStyles(theme => ({
    mainAction: {
        position: "absolute",
        top: -30,
        left: 0,
        right: 0,
        margin: "0 auto"
    },

    spacer: {
        flexGrow: 1
    },

    elementRight: {
        position: "absolute",
        right: theme.spacing(2)
    },

    fade: {
        transitionDuration: "0ms !important"
    },

    [theme.breakpoints.up("md")]: {
        elementRight: {
            right: theme.spacing(3)
        }
    }
}))

function removeInitialAnimation(Child) {
    return ({ className, children, ...props }) => {
        const classes = useStyles()

        const hasStateChanged = useRef(false)

        if (!props.in && !hasStateChanged.current) {
            hasStateChanged.current = true
        }

        return <Child in={props.in} className={clsx(!hasStateChanged.current && classes.fade, className)}>{children}</Child>
    }
}

const Fade = removeInitialAnimation(MuiFade)
const Zoom = removeInitialAnimation(MuiZoom)

function DefaultActions() {
    const classes = useStyles()

    const context = useContext(AppContext)

    const openMenuButton = useRef()

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleMoreClick = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleMenuClose = () => {
        setIsMenuOpen(false)
    }

    const handleDisableDrawingClick = () => {
        context.set({
            drawing: {
                enabled: false
            }
        })
    }

    const dispatchEvent = (name) => () => {
        context.dispatchEvent(name)
    }
    
    return (
        <Fade in={!context.focus}>
            <Toolbar>
                {/* Left */}

                <IconButton onClick={() => context.openDialog("Help", { data: helpOverlayData.default })}>
                    <HelpIcon />
                </IconButton>

                <IconButton onClick={() => context.openDialog("Templates")} id="templates-button">
                    <CloudDownloadIcon />
                </IconButton>

                {/* Center */}

                <div className={classes.spacer} />

                <Zoom in={!context.focus} className={classes.mainAction}>
                    <Fab color="primary" onClick={dispatchEvent("generateImage")} disabled={context.isEmptyState}>
                        <DoneIcon />
                    </Fab>
                </Zoom>

                {/* Right */}

                <div className={classes.elementRight}>
                    <Fade in={!context.drawing.enabled}>
                        <IconButton onClick={dispatchEvent("addTextbox")} id="textbox-button" disabled={context.isEmptyState}>
                            <TextFieldsIcon />
                        </IconButton>
                    </Fade>

                    <IconButton onClick={dispatchEvent("undo")} id="undo-button" disabled={context.isEmptyState}>
                        <UndoIcon />
                    </IconButton>

                    <Fade in={!context.drawing.enabled}>
                        <IconButton onClick={handleMoreClick} ref={openMenuButton} disabled={context.isEmptyState}>
                            <MoreVertIcon />
                        </IconButton>
                    </Fade>
                </div>

                <Zoom in={context.drawing.enabled}>
                    <IconButton onClick={handleDisableDrawingClick} className={classes.elementRight}>
                        <CloseIcon />
                    </IconButton>
                </Zoom>

                {/* Off-Layout */}

                <Menu open={isMenuOpen} anchorEl={openMenuButton.current} onClose={handleMenuClose} />
            </Toolbar>
        </Fade>
    )
}

export default DefaultActions