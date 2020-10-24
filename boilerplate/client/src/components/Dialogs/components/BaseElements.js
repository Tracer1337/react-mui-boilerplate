import React, { useContext } from "react"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary"
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"
import BlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"

import { AppContext } from "../../../App.js"
import { importFile, fileToImage } from "../../../utils"
import { BASE_ELEMENT_TYPES } from "../../../config/constants.js"
import BaseElement from "../../../Models/BaseElement.js"

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: `${theme.spacing(1)}px ${theme.spacing(3)}px`
    }
}))

function BaseElements({ onBaseElementCreate, onClose = () => {} }) {
    const context = useContext(AppContext)

    const classes = useStyles()

    const openTemplates = () => {
        onClose()
        context.openDialog("Templates")
    }

    const handleCreateImage = async () => {
        const file = await importFile("image/*")
        const base64Image = await fileToImage(file)

        onBaseElementCreate(new BaseElement({
            type: BASE_ELEMENT_TYPES["IMAGE"],
            image: base64Image
        }))

        onClose()
    }

    const handleCreateBlank = () => {
        onBaseElementCreate(new BaseElement({
            type: BASE_ELEMENT_TYPES["BLANK"]
        }))

        onClose()
    }

    return (
        <List>
            <ListItem button onClick={openTemplates} className={classes.listItem}>
                <ListItemIcon>
                    <CloudDownloadIcon />
                </ListItemIcon>

                <ListItemText primary="Template" />
            </ListItem>

            <ListItem button onClick={handleCreateImage} className={classes.listItem}>
                <ListItemIcon>
                    <PhotoLibraryIcon />
                </ListItemIcon>

                <ListItemText primary="Import" />
            </ListItem>

            <ListItem button onClick={handleCreateBlank} className={classes.listItem}>
                <ListItemIcon>
                    <BlankIcon />
                </ListItemIcon>

                <ListItemText primary="Blank" />
            </ListItem>
        </List>
    )
}

export default BaseElements