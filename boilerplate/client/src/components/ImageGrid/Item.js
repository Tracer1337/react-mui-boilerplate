import React from "react"
import { IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import DeleteIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles(theme => ({
    item: {
        display: "flex",
        marginBottom: theme.spacing(.5),
        position: "relative"
    },

    image: {
        width: "100%"
    },

    deleteButton: {
        position: "absolute",
        top: theme.spacing(.5),
        left: theme.spacing(.5)
    }
}))

function Item({ src, onDelete }) {
    const classes = useStyles()

    return (
        <div className={classes.item}>
            { onDelete && (
                <IconButton onClick={() => onDelete(src)} className={classes.deleteButton} size="small">
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            )}

            <img src={src} alt="" className={classes.image}/>
        </div>
    )
}

export default Item