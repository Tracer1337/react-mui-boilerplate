import React, { useContext } from "react"
import { Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { AppContext } from "../../App.js"
import Avatar from "../User/Avatar.js"

const useStyles = makeStyles(theme => ({
    header: {
        padding: theme.spacing(2)
    },

    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(2)
    }
}))

function Header({ data }) {
    const context = useContext(AppContext)

    const classes = useStyles()

    const handleOpenDialog = () => {
        context.openDialog("Profile", data)
    }

    return (
        <Grid container className={classes.header}>
            <Grid item onClick={handleOpenDialog}>
                <Avatar className={classes.avatar} user={data.user}/>
            </Grid>

            <Grid item onClick={handleOpenDialog}>
                <Typography>{ data.user.username }</Typography>
            </Grid>
        </Grid>
    )
}

export default Header