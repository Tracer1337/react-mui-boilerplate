import React, { useRef, useEffect, useContext } from "react"
import clsx from "clsx"
import { Avatar as MuiAvatar, Badge } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"

import { AppContext } from "../../App.js"
import { importFile } from "../../utils"
import { editAvatar } from "../../config/api.js"

const useStyles = makeStyles(theme => ({
    image: {
        borderRadius: "50%"
    },

    letter: {
        backgroundColor: theme.palette.success.light
    },

    upload: {
        border: `2px solid ${theme.palette.background.paper}`,
        width: 24,
        height: 24,
        borderRadius: "50%"
    },

    uploadIcon: {
        fontSize: 16
    }
}))

function Actions({ children, onClick }) {
    const classes = useStyles()

    return (
        <Badge
            badgeContent={(
                <AddIcon className={classes.uploadIcon} />
            )}
            color="primary"
            overlap="circle"
            anchorOrigin={{
                horizontal: "right",
                vertical: "bottom"
            }}
            classes={{ badge: classes.upload }}
            onClick={onClick}
        >
            { children }
        </Badge>
    )
}

function Avatar({ user, hasUploadButton, className }) {
    const context = useContext(AppContext)
    
    const classes = useStyles()

    const avatarRef = useRef()

    const handleUploadImage = async () => {
        const file = await importFile("image/*")

        const formData = new FormData()
        formData.append("image", file)

        editAvatar(formData)
            .then(res => context.set({
                auth: {
                    user: res.data
                }
            }))
            .catch(console.error)
    }

    useEffect(() => {
        if (avatarRef.current) {
            const size = avatarRef.current.clientWidth
            avatarRef.current.style.fontSize = `calc(1.25rem * (${size} / 40))`
        }
    }, [avatarRef])

    const Container = hasUploadButton ? Actions : React.Fragment

    return (
        <Container {...(hasUploadButton ? {
            onClick: handleUploadImage
        } : {})}>
            { user.avatar_url ? (
                <img className={clsx(classes.image, className)} alt="" src={user.avatar_url}/>
            ) : (
                <MuiAvatar className = {clsx(classes.letter, className)} ref={avatarRef}>
                    { user.username[0]}
                </MuiAvatar>
            )}
        </Container>
    )
}

export default Avatar