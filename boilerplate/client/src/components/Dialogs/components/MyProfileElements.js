import React, { useContext } from "react"
import { Typography, Button as MuiButton, Grid, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import PeopleIcon from "@material-ui/icons/People"

import { AppContext } from "../../../App.js"

const useStyles = makeStyles(theme => ({
    myProfileElements: {
        margin: theme.spacing(2),
        marginBottom: 0
    },

    title: {
        marginBottom: theme.spacing(2)
    },

    buttonWrapper: {
        marginBottom: theme.spacing(1)
    },

    iconButton: {
        padding: 0,
        marginRight: theme.spacing(2)
    }
}))

function Button({ Icon, onClick, children, ...props }) {
    const classes = useStyles()

    return (
        <Grid wrap="nowrap" container className={classes.buttonWrapper}>
            <IconButton onClick={onClick} className={classes.iconButton}>
                <Icon/>
            </IconButton>

            <MuiButton
                variant="outlined"
                color="primary"
                fullWidth
                onClick={onClick}
                {...props}
            >
                { children}
            </MuiButton>
        </Grid>
    )
}

function MyProfileElements() {
    const context = useContext(AppContext)

    const classes = useStyles()

    return (
        <div className={classes.myProfileElements}>
            <Typography variant="h6" className={classes.title}>Meme-Bros</Typography>

            <Button onClick={() => context.openDialog("AddFriends")} Icon={PersonAddIcon}>Add Meme-Bros</Button>

            <Button onClick={() => context.openDialog("MyFriends")} Icon={PeopleIcon}>My Meme-Bros</Button>
        </div>
    )
}

export default MyProfileElements