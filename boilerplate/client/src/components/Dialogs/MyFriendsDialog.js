import React, { useState } from "react"
import { Dialog, Slide, AppBar, Toolbar, IconButton, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/ExpandMore"

import SearchBar from "./components/SearchBar.js"
import MyFriends from "./components/MyFriends.js"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles(theme => ({
    body: {
        padding: `${theme.spacing(2)}px ${theme.spacing(2)}px 0px`,
        marginTop: theme.mixins.toolbar.minHeight
    },

    searchBar: {
        marginBottom: theme.spacing(2)
    }
}))

function MyFriendsDialog({ open, onClose }) {
    const classes = useStyles()

    const [search, setSearch] = useState("")

    const handleClose = () => {
        onClose()
        setSearch("")
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
            TransitionComponent={Transition}
        >
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" onClick={handleClose} color="inherit">
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="subtitle1">My Meme-Bros</Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.body}>
                <SearchBar value={search} onChange={setSearch} className={classes.searchBar} />

                <MyFriends search={search}/>
            </div>
        </Dialog>
    )
}

export default MyFriendsDialog