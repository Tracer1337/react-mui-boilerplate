import React from "react"
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "./Header.js"

const useStyles = makeStyles(theme => ({
    body: {
        display: props => props.center && "flex",
        flexDirection: props => props.center && "column",
        alignItems: props => props.center && "center",
        marginBottom: theme.spacing(8)
    }
}))

function Layout({ headerProps = {}, children, center = false }) {
    const classes = useStyles({ center })

    return (
        <Container>
            <Header {...headerProps}/>

            <div className={classes.body}>
                { children }
            </div>
        </Container>
    )
}

export default Layout