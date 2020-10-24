import React, { useContext } from "react"
import { Dialog, AppBar, Toolbar, Slide, IconButton, Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/ChevronLeft"

import { AppContext } from "../../App.js"

const useStyles = makeStyles(theme => ({
    spacer: {
        marginTop: theme.mixins.toolbar.minHeight + theme.spacing(2)
    },

    section: {
        margin: theme.spacing(2),
        marginTop: 0
    },

    title: {
        marginBottom: theme.spacing(2)
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
})

function SettingsDialog({ onClose, open }) {
    const context = useContext(AppContext)

    const classes = useStyles()
    
    const handleLogout = () => {
        context.set({
            auth: {
                user: null,
                isLoggedIn: false,
                token: null
            }
        })

        context.dispatchEvent("logout")

        onClose()
    }

    return (
        <Dialog fullScreen onClose={onClose} open={open} TransitionComponent={Transition}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" onClick={onClose} color="inherit">
                        <CloseIcon/>
                    </IconButton>

                    <Typography variant="subtitle1">
                        Settings
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.spacer}/>

            <div className={classes.section}>
                <Typography variant="h6" className={classes.title}>My Account</Typography>

                <Button variant="outlined" color="primary" fullWidth onClick={handleLogout}>Logout</Button>
            </div>
        </Dialog>
    )
}

export default SettingsDialog