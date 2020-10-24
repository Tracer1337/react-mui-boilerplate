import React, { useContext } from "react"
import { Menu as MuiMenu, MenuItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import BorderOuterIcon from "@material-ui/icons/BorderOuter"
import GridIcon from "@material-ui/icons/GridOn"
import AddPhotoIcon from "@material-ui/icons/AddPhotoAlternate"
import ReloadIcon from "@material-ui/icons/Replay"
import RectangleIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import EditIcon from "@material-ui/icons/Edit"

import { AppContext } from "../../App.js"

const useStyles = makeStyles(theme => ({
    icon: {
        minWidth: theme.spacing(4)
    }
}))

function Menu({ open, anchorEl, onClose }) {
    const context = useContext(AppContext)

    const classes = useStyles()

    const dispatchEvent = (name) => () => {
        context.dispatchEvent(name)
        onClose()
    }

    const handleEnableDrawing = () => {
        context.set({
            drawing: {
                enabled: true
            }
        })
        onClose()
    }

    return (
        <MuiMenu
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left"
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
        >
            {/* Draw */}
            <MenuItem onClick={handleEnableDrawing}>
                <ListItemIcon className={classes.icon}>
                    <EditIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Draw"/>
            </MenuItem>
            
            {/* Rectangle */}
            <MenuItem onClick={dispatchEvent("addRectangle")}>
                <ListItemIcon className={classes.icon}>
                    <RectangleIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Rectangle"/>
            </MenuItem>

            {/* Sticker */}
            <MenuItem onClick={dispatchEvent("importSticker")}>
                <ListItemIcon className={classes.icon}>
                    <AddPhotoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Sticker" />
            </MenuItem>

            <Divider/>

            {/* Border */}
            <MenuItem onClick={dispatchEvent("setBorder")}>
                <ListItemIcon className={classes.icon}>
                    <BorderOuterIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Border"/>
            </MenuItem>

            {/* Grid */}
            <MenuItem onClick={dispatchEvent("setGrid")}>
                <ListItemIcon className={classes.icon}>
                    <GridIcon fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Grid"/>
            </MenuItem>

            <Divider/>

            {/* Base */}
            <MenuItem onClick={dispatchEvent("openBaseSelection")}>
                <ListItemIcon className={classes.icon}>
                    <ReloadIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Base" />
            </MenuItem>
        </MuiMenu>
    )
}

export default Menu