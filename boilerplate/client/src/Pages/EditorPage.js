import React, { useContext } from "react"

import { AppContext } from "../App.js"
import Layout from "../components/Layout/Layout.js"
import HeaderActions from "../components/BottomBar/HeaderActions.js"
import Canvas from "../components/Canvas/Canvas.js"
import BottomBar from "../components/BottomBar/BottomBar.js"

function EditorPage() {
    const context = useContext(AppContext)

    return (
        <Layout header={context.isEmptyState} footer={context.isEmptyState}>
            <HeaderActions/>
            <Canvas/>
            <BottomBar/>
        </Layout>
    )
}

export default EditorPage