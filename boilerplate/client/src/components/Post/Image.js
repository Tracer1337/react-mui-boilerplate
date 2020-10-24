import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    image: {
        width: "100%"
    }
}))

function Image({ data }) {
    const classes = useStyles()

    return (
        <img className={classes.image} alt="" src={data.upload.url}/>
    )
}

export default Image