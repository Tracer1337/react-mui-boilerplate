import React, { useContext, useEffect, useRef, useImperativeHandle } from "react"
import ReactDOM from "react-dom"
import { IconButton, GridList, GridListTile, CircularProgress, Fab, Zoom, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"

import { AppContext } from "../../../App.js"

import { deleteSticker, uploadSticker } from "../../../config/api.js"
import { importFile } from "../../../utils"
import { cacheImage } from "../../../utils/cache.js"
import useAPIData from "../../../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    listWrapper: {
        display: "flex",
        justifyContent: "center",
        overflow: "hidden"
    },

    list: {
        maxWidth: 400,
        paddingTop: theme.spacing(1),
        width: "100%"
    },

    tile: {
        cursor: "pointer",
        
        "& div": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    },

    deleteButton: {
        zIndex: 10,
        position: "absolute",
        top: 0,
        left: 0
    },

    addButton: {
        position: "fixed",
        right: theme.spacing(2),
        bottom: theme.spacing(2)
    }
}))

function InnerTile({ sticker, onDelete }) {
    const context = useContext(AppContext)

    const classes = useStyles()

    const image = useRef()

    const resizeImage = () => {
        if (!image.current) {
            return
        }

        // Set image dimensions
        if (image.current.naturalWidth >= image.current.naturalHeight) {
            image.current.style.width = "100%"
        } else if (image.current.naturalHeight > image.current.naturalWidth) {
            image.current.style.height = "100%"
        }
    }

    const handleImageLoad = () => {
        cacheImage(sticker.image_url)
    }

    useEffect(() => {
        if (!image.current) {
            return
        }

        image.current.onload = () => {
            resizeImage()
        }
    }, [])
    
    return (
        <>
            <img src={sticker.image_url} alt="Sticker" loading="lazy" ref={image} onLoad={handleImageLoad}/>

            {context.auth.user?.is_admin && (
                <IconButton onClick={() => onDelete(sticker)} className={classes.deleteButton}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            )}
        </>
    )
}

function Stickers({ onLoad, active }, ref) {
    const context = useContext(AppContext)

    const classes = useStyles()

    const currentSticker = useRef({})

    const { data, isLoading, reload } = useAPIData("getStickers")

    const handleDelete = (sticker) => {
        currentSticker.current = sticker

        const dialogHandler = context.openDialog("Confirm", { content: `Sticker ${currentSticker.current.id} will be deleted` })

        dialogHandler.addEventListener("close", (shouldDelete) => {
            if (shouldDelete) {
                deleteSticker(currentSticker.current.id)
                    .then(reload)
            }
        })
    }

    const handleClick = (event, sticker) => {
        // Prevent loading when delete icon got clicked
        if (event.target.tagName === "DIV" || event.target.tagName === "IMG") {
            onLoad(sticker)
        }
    }

    const handleAddSticker = async () => {
        // Import image
        const image = await importFile("image/*")

        // Create form data
        const formData = new FormData()
        formData.append("image", image)

        // Upload image
        await uploadSticker(formData)
        reload()
    }

    useImperativeHandle(ref, () => ({
        reload
    }))

    if (isLoading) {
        return <CircularProgress />
    }

    if (!data) {
        return <Typography>Could not load data</Typography>
    }

    // Sort by usage => Push most used stickers to the top
    data.sort((a, b) => b.amount_uses - a.amount_uses)

    const actionContainer = document.getElementById("templates-dialog-inner-container")

    return (
        <div className={classes.listWrapper}>
            <GridList className={classes.list} cols={3}>
                {data.map((sticker, i) => (
                    <GridListTile className={classes.tile} onClick={e => handleClick(e, sticker)} key={i}>
                        <InnerTile sticker={sticker} onDelete={handleDelete}/>
                    </GridListTile>    
                ))}
            </GridList>
            
            {context.auth.user?.is_admin && actionContainer && ReactDOM.createPortal((
                <Zoom in={active} unmountOnExit>
                    <Fab color="secondary" className={classes.addButton} onClick={handleAddSticker}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            ), actionContainer)}
        </div>
    )
}

export default React.forwardRef(Stickers)