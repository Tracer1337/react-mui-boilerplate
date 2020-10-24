import React, { useContext } from "react"
import { Toolbar, IconButton, Fade } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/Close"
import CloneIcon from "@material-ui/icons/LibraryAddOutlined"
import FlipToBackIcon from "@material-ui/icons/FlipToBack"
import FlipToFrontIcon from "@material-ui/icons/FlipToFront"
import HelpIcon from "@material-ui/icons/Help"

import { AppContext } from "../../App.js"
import helpOverlayData from "../../config/help-overlay-data.json"

const useStyles = makeStyles(theme => ({
    elementActions: {
        position: "absolute",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between"
    }
}))

function ElementActions() {
    const context = useContext(AppContext)

    const classes = useStyles()

    const { element, controls } = context.focus || {}

    const dispatchEvent = (name) => () => {
        context.dispatchEvent(name, { element })
    }

    return (
        <Fade in={!!context.focus}>
            <Toolbar className={classes.elementActions}>
                <div>
                    <IconButton onClick={() => context.openDialog("Help", { data: helpOverlayData.elements })}>
                        <HelpIcon />
                    </IconButton>
                </div>

                <div>
                    {controls?.includes("clone") && (
                        <IconButton onClick={dispatchEvent("elementClone")} id="clone-button">
                            <CloneIcon />
                        </IconButton>
                    )}

                    {controls?.includes("layers") && (
                        <IconButton onClick={dispatchEvent("elementToBack")} id="to-back-button">
                            <FlipToBackIcon />
                        </IconButton>
                    )}

                    {controls?.includes("layers") && (
                        <IconButton onClick={dispatchEvent("elementToFront")} id="to-front-button">
                            <FlipToFrontIcon />
                        </IconButton>
                    )}

                    <IconButton onClick={dispatchEvent("elementBlur")}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </Fade>
    )
}

export default ElementActions