import React, { useContext } from "react"
import { Dialog, AppBar, Toolbar, Typography, Slide, IconButton, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/ExpandMore"
import SettingsIcon from "@material-ui/icons/Settings"

import { AppContext } from "../../App.js"
import Avatar from "../User/Avatar.js" 
import MyProfileElements from "./components/MyProfileElements.js"
import ProfileContent from "./components/ProfileContent.js"
import { deletePost } from "../../config/api.js"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles(theme => ({
    innerDialog: {
        overflowY: "overlay",
        overflowX: "hidden"
    },

    header: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: "none"
    },

    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    },

    grid: {
        marginTop: theme.mixins.toolbar.minHeight
    },

    avatar: {
        width: 64,
        height: 64,
        marginBottom: theme.spacing(1)
    }
}))

function ProfileDialog({ open, onClose, user, onReload = () => {} }) {
    const context = useContext(AppContext)

    const classes = useStyles()

    const isMyProfile = context.auth.isLoggedIn && user.id === context.auth.user.id

    const handlePostDelete = (post) => {
        const dialogHandle = context.openDialog("Confirm", { content: "The post will be deleted" })

        dialogHandle.addEventListener("close", (shouldDelete) => {
            if (shouldDelete) {
                deletePost(post.id)
                    .then(() => context.dispatchEvent("reloadPosts"))
            }
        })
    }

    return (
        <Dialog open={open} onClose={onClose} fullScreen TransitionComponent={Transition} classes={{ paper: classes.innerDialog }}>
            <AppBar className={classes.header}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>

                    { isMyProfile && (
                        <IconButton edge="end" onClick={() => context.openDialog("Settings")}>
                            <SettingsIcon />
                        </IconButton>
                    ) }
                </Toolbar>
            </AppBar>

            <Grid container direction="column" alignItems="center" className={classes.grid}>
                <Grid item>
                    <Avatar user={user} className={classes.avatar} hasUploadButton={isMyProfile}/>
                </Grid>

                <Grid item>
                    <Typography variant="h6">{user.username}</Typography>
                </Grid>
            </Grid>

            { isMyProfile && <MyProfileElements/> }

            <ProfileContent user={user} onReload={onReload} onPostDelete={isMyProfile && handlePostDelete}/>
        </Dialog>
    )
}

export default ProfileDialog