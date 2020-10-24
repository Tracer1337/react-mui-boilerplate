import React from "react"
import { IconButton, Typography, CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import RemoveIcon from "@material-ui/icons/Close"

import UserCard from "../../User/UserCard.js"
import { removeFriend } from "../../../config/api.js"
import useAPIData from "../../../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    letter: {
        marginBottom: theme.spacing(2)
    },

    usercard: {
        marginBottom: theme.spacing(2)
    }
}))

function MyFriends({ search }) {
    const classes = useStyles()

    const { isLoading, data, reload } = useAPIData({
        method: "getMyFriends",
        useCache: false
    })

    const handleAddClick = (user) => {
        removeFriend(user.id)
            .then(reload)
            .catch(console.error)
    }

    if (isLoading || !data) {
        return (
            <CircularProgress />
        )
    }

    const renderUsers = data.filter(user => user.username.startsWith(search))

    const sortedUsers = renderUsers.reduce((map, user) => {
        const letter = user.username[0].toUpperCase()

        if (!map[letter]) {
            map[letter] = []
        }

        map[letter].push(user)

        return map
    }, {})

    const sortedKeys = Object.keys(sortedUsers).sort((a, b) => a.localeCompare(b))

    return (
        <div>
            { sortedKeys.map(letter => (
                <div key={letter}>
                    <Typography variant="h6" className={classes.letter}>{ letter }</Typography>

                    { sortedUsers[letter].map(user => (
                        <UserCard user={user} className={classes.usercard} key={user.id} RightElement={(
                            <IconButton onClick={() => handleAddClick(user)}>
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                        )} />
                    )) }
                </div>
            )) }
        </div>
    )
}

export default MyFriends