import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import Header from "./Header.js"
import Image from "./Image.js"
import Footer from "./Footer.js"

const useStyles = makeStyles(theme => ({
    post: {
    }
}))

function Post({ data }) {
    const classes = useStyles()

    return (
        <div className={classes.post}>
            <Header data={data}/>
            <Image data={data}/>
            <Footer data={data}/>
        </div>
    )
}

export default Post