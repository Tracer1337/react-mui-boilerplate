import React, { useContext, useEffect } from "react"
import { CircularProgress } from "@material-ui/core"

import { AppContext } from "../../../App.js"
import ImageGrid from "../../../components/ImageGrid/ImageGrid.js"
import useAPIData from "../../../utils/useAPIData.js"
import { createListeners } from "../../../utils"

function PostsGrid({ user, onPostDelete }) {
    const context = useContext(AppContext)

    const { isLoading, data, reload } = useAPIData({
        method: "getPostsByUser",
        data: user.id
    })

    useEffect(() => {
        return createListeners(context, [
            ["reloadPosts", reload]
        ])
    })

    if (isLoading) {
        return <CircularProgress/>
    }

    const images = data.map(post => post.upload.url)

    const onDelete = (src) => {
        const post = data.find(post => post.upload.url === src)
        onPostDelete(post)
    }

    return (
        <ImageGrid images={images} ItemProps={{ onDelete }}/>
    )
}

export default PostsGrid