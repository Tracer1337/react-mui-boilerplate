import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { AppBar, Toolbar, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AccountIcon from "@material-ui/icons/AccountCircle"
import PersonAddIcon from "@material-ui/icons/PersonAdd"

import { AppContext } from "../../App.js"
import Avatar from "../User/Avatar.js"

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: theme.palette.background.default,
        boxShadow: "none"
    },

    accountButton: {
        marginRight: theme.spacing(2)
    },

    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    }
}))

function Header({ isHidden }) {
    const context = useContext(AppContext)
    
    const history = useHistory()
    
    const classes = useStyles()
    
    const handleAvatarClick = () => {
        if (!context.auth.isLoggedIn) {
            history.push("/login")
        } else {
            context.openDialog("Profile", {
                user: context.auth.user,
                onReload: context.reloadProfile
            })
        }
    }

    return (
        <AppBar className={classes.header} style={{ display: isHidden && "none" }}>
            <Toolbar>
                <div className={classes.accountButton}>
                    <IconButton size="small" onClick={handleAvatarClick}>
                        {context.auth.isLoggedIn ? (
                            <Avatar user={context.auth.user} className={classes.avatar} />
                        ) : (
                            <AccountIcon />
                        )}
                    </IconButton>
                </div>

                { context.auth.isLoggedIn && (
                    <IconButton size="small" onClick={() => context.openDialog("AddFriends")}>
                        <PersonAddIcon />
                    </IconButton>
                ) }
            </Toolbar>
        </AppBar>
    )
}

export default Header