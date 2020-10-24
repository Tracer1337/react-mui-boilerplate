import React from "react"
import { Dialog, ClickAwayListener, Tooltip } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    innerDialog: {
        background: "none",
        overflow: "hidden"
    }
}))

const tooltipOffset = 20

function OverlayChild({ data: { selector, content }, open }) {
    const rect = document.querySelector(selector)?.getBoundingClientRect()

    if (!rect) {
        return null
    }
    
    return (
        <Tooltip
            open={open}
            placement="top"
            arrow
            title={content}
        >
            <div style={{
                position: "absolute",
                top: rect.top + tooltipOffset,
                left: rect.left,
                width: rect.width + "px",
                height: rect.height + "px"
            }}/>
        </Tooltip>
    )
}

function HelpDialog({ open, onClose, data }) {
    const classes = useStyles()

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen
            PaperProps={{ className: classes.innerDialog }}
        >
            <ClickAwayListener onClickAway={onClose}>
                <div>
                    {data.map((data, i) => <OverlayChild data={data} key={i} open={open}/>)}
                </div>
            </ClickAwayListener>
        </Dialog>
    )
}

export default HelpDialog