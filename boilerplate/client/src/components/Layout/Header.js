import React from "react"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core"

function Header({ title = "Website" }) {
    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                <Grid container justify="space-between">
                    <Link to="/">
                        <Typography color="textPrimary" variant="h6">{ title }</Typography>
                    </Link>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header