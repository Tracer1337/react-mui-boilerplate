import React, { useState, useEffect } from "react"
import { CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import ImageGrid from "../components/ImageGrid/ImageGrid.js"
import { createListeners } from "../utils"
import { getAllPosts } from "../config/api.js"

const useStyles = makeStyles(theme => ({
    spacer: {
        height: 40
    }
}))

function ExplorePage() {
    const classes = useStyles()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [isDone, setIsDone] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (!isDone && window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
                setPage(page + 1)
            }
        }

        return createListeners(window, [
            ["scroll", handleScroll]
        ])
    })

    useEffect(() => {
        setIsLoading(true)

        getAllPosts(page)
            .then(res => {
                setData(data => [...data, ...res.data])

                if (!res.data.length) {
                    setIsDone(true)
                }
            })
            .finally(() => setIsLoading(false))
    }, [page])

    if (isLoading && page === 0) {
        return (
            <Layout>
                <CircularProgress />
            </Layout>
        )
    }

    const images = data.map(post => post.upload.url)

    return (
        <Layout>
            <ImageGrid images={images} />

            { isLoading && page > 0 ? <CircularProgress/> : <div className={classes.spacer}/> }
        </Layout>
    )
}

export default ExplorePage