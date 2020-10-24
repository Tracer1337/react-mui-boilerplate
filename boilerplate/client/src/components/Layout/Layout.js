import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import Header from "./Header.js"
import Footer from "./Footer.js"
import ComponentOpener from "../ComponentOpener/ComponentOpener.js"

const useStyles = makeStyles(theme => ({
    layout: props => ({
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        paddingTop: theme.mixins.toolbar.minHeight,
        paddingBottom: theme.mixins.toolbar.minHeight,
        boxSizing: "border-box",
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        display: props.center && "flex",
        alignItems: props.center && "center",
        flexDirection: "column"
    })
}))

function Layout({ children, center, header = true, footer = true }) {
    const classes = useStyles({ center })

    return (
        <div className={classes.layout}>
            <Header isHidden={!header}/>

            { children }

            <Footer isHidden={!footer}/>

            <ComponentOpener />
        </div>
    )
}

export default Layout