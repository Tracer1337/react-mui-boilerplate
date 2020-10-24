import React, { useState, useEffect, useRef } from "react"
import { Dialog, Slide, AppBar, Toolbar, IconButton, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/ExpandMore"

import SearchBar from "./components/SearchBar.js"
import AddFriends from "./components/AddFriends.js"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>
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

function AddFriendsDialog({ open, onClose }) {
    const classes = useStyles()

    const usersRef = useRef()

    const [search, setSearch] = useState("")

    const handleClose = () => {
        onClose()
        setSearch("")
    }

    useEffect(() => {
        if (usersRef.current) {
            if (search) {
                usersRef.current.reload()
            } else {
                usersRef.current.reset()
            }
        }
    }, [search])

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
                        <CloseIcon/>
                    </IconButton>

                    <Typography variant="subtitle1">Add Meme-Bros</Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.body}>
                <SearchBar value={search} onChange={setSearch} className={classes.searchBar}/>

                <AddFriends search={search} ref={usersRef}/>
            </div>
        </Dialog>
    )
}

export default AddFriendsDialog