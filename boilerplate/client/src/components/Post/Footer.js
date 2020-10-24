import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(2)
    }
}))

function Footer({ data }) {
    const classes = useStyles()

    return (
        <div className={classes.footer}>
            <Typography variant="subtitle2">{ data.created_at.fromNow() }</Typography>
        </div>
    )
}

export default Footer