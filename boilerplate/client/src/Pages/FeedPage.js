import React, { useState, useEffect, useRef, useImperativeHandle } from "react"
import { CircularProgress } from "@material-ui/core"
import PullToRefresh from "pulltorefreshjs"

import Layout from "../components/Layout/Layout.js"
import Post from "../components/Post/Post.js"
import useAPIData from "../utils/useAPIData.js"
import { createListeners } from "../utils"

const Page = React.forwardRef(function ({ page }, ref) {
    const childRef = useRef()
    
    const [hasChild, setHasChild] = useState(false)
    
    const { isLoading, data, reload } = useAPIData({
        method: "getFriendsPosts",
        data: page
    })

    const destroy = () => {
        if (childRef.current) {
            childRef.current.destroy()
        }
        setHasChild(false)
    }

    useEffect(() => {
        if (hasChild || !data?.length) {
            return
        }

        const handleScroll = () => {
            if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
                setHasChild(true)
            }
        }

        return createListeners(window, [
            ["scroll", handleScroll]
        ])
    })

    useImperativeHandle(ref, () => ({
        reload: () => {
            destroy()
            reload()
        },

        destroy
    }))

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <>
            { data.map(post => (
                <Post data={post} key={post.id} />
            )) }

            { hasChild && <Page page={page + 1} ref={childRef}/> }
        </>
    )
})

function FeedPage() {
    const pageRef = useRef()

    useEffect(() => {
        PullToRefresh.init({
            mainElement: "body",
            onRefresh: pageRef.current.reload
        })

        return PullToRefresh.destroyAll
    })

    return (
        <Layout>
            <Page page={0} ref={pageRef}/>
        </Layout>
    )
}

export default FeedPage