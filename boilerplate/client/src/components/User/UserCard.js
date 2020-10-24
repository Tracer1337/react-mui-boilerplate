import React, { useContext } from "react"
import clsx from "clsx"
import { Paper, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { AppContext } from "../../App.js"
import Avatar from "./Avatar.js"

const useStyles = makeStyles(theme => ({
    userCard: {
        padding: "2px 0 2px 4px"
    },

    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2)
    }
}))

function UserCard({ user, className, RightElement }) {
    const context = useContext(AppContext)

    const classes = useStyles()

    return (
        <Paper className={clsx(classes.userCard, className)} variant="outlined">
            <Grid container justify="space-between" wrap="nowrap">
                <Grid item container alignItems="center" onClick={() => context.openDialog("Profile", { user })}>
                    <Avatar user={user} className={classes.avatar}/>

                    <Typography variant="subtitle2">{ user.username }</Typography>
                </Grid>

                <Grid item>
                    { RightElement || null }
                </Grid>
            </Grid>
        </Paper>
    )
}

export default UserCard