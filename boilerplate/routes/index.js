const fs = require("fs")
const path = require("path")
const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")

const rootRouter = express.Router()

// Get all routes in current directory
const routes = fs.readdirSync(__dirname)
                .filter(filename => filename !== "index.js")
                .map(filename => [filename.slice(0, -3), require("./" + filename)])

// Create routes
for(let [route, router] of routes) {
    rootRouter.use("/" + route, router)
}

if (process.env.NODE_ENV === "development") {
    // Proxy react dev-server
    rootRouter.use("/", createProxyMiddleware({
        target: "http://localhost:3000/",
        ws: true
    }))
} else {
    // Serve static files
    rootRouter.use(express.static(path.join(__dirname, "..", "public")))

    // Server React App on /*
    rootRouter.get("/*", (req, res) => res.sendFile(path.resolve(__dirname, "..", "public", "index.html")))
}

module.exports = rootRouter