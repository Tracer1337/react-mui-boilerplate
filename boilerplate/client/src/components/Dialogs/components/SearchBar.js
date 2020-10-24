import React from "react"
import clsx from "clsx"
import { Paper, InputBase, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/Close"

const useStyles = makeStyles(theme => ({
    search: {
        padding: "2px 4px",
        display: "flex"
    },

    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },

    clear: {
        padding: theme.spacing(1)
    },
}))

function SearchBar({ onChange, value, className }) {
    const classes = useStyles()

    return (
        <Paper variant="outlined" className={clsx(classes.search, className)}>
            <InputBase value={value} onChange={event => onChange(event.target.value)} placeholder="Search" className={classes.input} />

            <IconButton onClick={() => onChange("")} className={classes.clear}>
                <CloseIcon fontSize="small"/>
            </IconButton>
        </Paper>
    )
}


export default SearchBar
