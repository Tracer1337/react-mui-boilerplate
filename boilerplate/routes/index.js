const fs = require("fs")
const path = require("path")
const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")

const ROOT_DIR = path.join(__dirname, "..")

const rootRouter = express.Router()

/**
 * Serve static views (name.static.pug)
 */
fs.readdirSync(path.join(ROOT_DIR, "views", "static")).forEach(filename => {
    const route = filename.replace(".pug", "")

    rootRouter.get("/" + route, (req, res) => {
        res.render("static/" + route)
    })
})

/**
 * Create routes from files in current directory
 */
const routes = fs.readdirSync(__dirname)
                .filter(filename => filename !== "index.js")
                .map(filename => [filename.slice(0, -3), require("./" + filename)])

for(let [route, router] of routes) {
    rootRouter.use("/" + route, router)
}

/**
 * Serve static files
 */
function serveStaticFiles() {
    rootRouter.use(express.static(path.join(ROOT_DIR, "public")))
    
    rootRouter.use("/storage", express.static(path.join(ROOT_DIR, "storage")))
}

/**
 * Serve react app
 */
if (process.env.NODE_ENV === "development") {
    // Proxy react dev-server
    rootRouter.use("/editor", createProxyMiddleware({
        target: "http://localhost:3000/",
        ws: true
    }))

    serveStaticFiles()
} else {
    serveStaticFiles()

    rootRouter.get("/*", (req, res) => res.sendFile(path.resolve(ROOT_DIR, "public", "editor", "index.html")))
}

module.exports = rootRouter
