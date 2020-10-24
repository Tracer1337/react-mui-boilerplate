import React, { useContext } from "react"
import { AppBar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { AppContext } from "../../App.js"
import DefaultActions from "./DefaultActions.js"
import ElementActions from "./ElementActions"

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "absolute",
        top: "unset",
        bottom: 0,
        left: 0,
        right: "unset",
        backgroundColor: theme.palette.background.paper
    }
}))

function BottomBar() {
    const context = useContext(AppContext)
    
    const classes = useStyles()

    return (
        <div style={{ display: context.isEmptyState && "none" }}>
            <AppBar position="fixed" className={classes.appBar} id="bottom-bar">
                <DefaultActions/>
                <ElementActions/>
            </AppBar>
        </div>
    )
}

export default BottomBar