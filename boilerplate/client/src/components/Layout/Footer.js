import React from "react"
import { useHistory, useLocation } from "react-router-dom"
import { AppBar, Toolbar, IconButton, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import HomeIconOutlined from "@material-ui/icons/HomeOutlined"
import HomeIconFilled from "@material-ui/icons/Home"
import ExploreIconOutline from "@material-ui/icons/ExploreOutlined"
import ExploreIconFilled from "@material-ui/icons/Explore"
import AddIconOutlined from "@material-ui/icons/AddCircleOutline"
import AddIconFilled from "@material-ui/icons/AddCircle"

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        position: "fixed",
        top: "auto",
        bottom: 0,
        boxShadow: "none"
    }
}))

function FooterItem({ path, iconActive, iconInactive }) {
    const history = useHistory()

    const location = useLocation()

    const isActive = location.pathname.startsWith(path)

    return (
        <IconButton onClick={() => history.push(path)}>
            {isActive ? iconActive : iconInactive}
        </IconButton>
    )
}

function Footer({ isHidden }) {
    const classes = useStyles()

    return (
        <AppBar className={classes.footer} style={{ display: isHidden && "none" }}>
            <Toolbar>
                <Grid container justify="space-around">
                    <FooterItem path="/feed" iconActive={<HomeIconFilled/>} iconInactive={<HomeIconOutlined/>}/>
                    <FooterItem path="/editor" iconActive={<AddIconFilled/>} iconInactive={<AddIconOutlined/>}/>
                    <FooterItem path="/explore" iconActive={<ExploreIconFilled/>} iconInactive={<ExploreIconOutline/>}/>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Footer