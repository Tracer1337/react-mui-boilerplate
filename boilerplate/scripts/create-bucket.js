const path = require("path")
const chalk = require("chalk")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

const StorageFacade = require("../app/Facades/StorageFacade.js")

;(async () => {
    const result = await StorageFacade.createBucket()
    console.log(result)
    console.log(chalk.green("Created bucket successfully"))
    console.log(chalk.underline(result.Bucket))
})()