const express = require("express")
const cors = require("cors")
const AWS = require("aws-sdk")

const createConnection = require("../../database")
const routes = require("../../routes")

async function boot(app) {
    global.db = await createConnection()

    AWS.config.update({ region: "eu-central-1" })

    setupExpress(app)
}

function setupExpress(app) {
    app.set("view engine", "pug")

    if (process.env.NODE_ENV === "development") {
        app.use(cors())
    }

    // Support json
    app.use(express.json({ limit: "10MB" }))
    
    // Support form data
    app.use(express.urlencoded({
        extended: true
    }))

    // Use Routes
    app.use("/", routes)
}

module.exports = boot