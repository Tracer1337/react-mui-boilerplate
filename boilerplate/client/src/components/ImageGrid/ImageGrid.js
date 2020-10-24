import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import Item from "./Item.js"


const useStyles = makeStyles(theme => ({
    imageGrid: {
        display: "flex"
    },

    row: {
        width: "calc(100% / 3)",
        padding: `0 ${theme.spacing(.25)}px`
    }
}))

function ImageGrid({ images, ItemProps }) {
    const classes = useStyles()

    const rows = []

    for (let i = 0; i < images.length; i++) {
        const row = i % 3

        if (!rows[row]) {
            rows[row] = []
        }

        rows[row].push(images[i])
    }

    return (
        <div className={classes.imageGrid}>
            { rows.map((images, i) => (
                <div className={classes.row} key={i}>
                    { images.map((src) => <Item src={src} key={src} {...ItemProps}/>)}
                </div>
            )) }
        </div>
    )
}

export default ImageGrid