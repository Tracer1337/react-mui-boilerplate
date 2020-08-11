require("dotenv").config()
const express = require("express")

require("./app/utils")
const { createConnection } = require("./database")
const routes = require("./routes")

// Connect to database
global.db = createConnection()

const app = express()

// Support form data
app.use(express.urlencoded({
    extended: true
}))

// Support json
app.use(express.json())

// Use Routes
app.use("/", routes)

// Start server on port specified in .env
app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT)
})