const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const { makeRunnable, run } = require("@m.moelter/task-runner")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

const createConnection = require("../database")

const SEEDERS_DIR = path.join(__dirname, "..", "database", "seeders")

const runnable = makeRunnable(async () => {
    // Get all seeders from seed directory
    const seeders = fs.readdirSync(SEEDERS_DIR)
        .filter(filename => filename.endsWith(".js"))
        .map(filename => require(path.join(SEEDERS_DIR, filename)))

    for (let seeder of seeders) {
        if (!seeder.run) {
            continue
        }

        await run(seeder.run, "Seeding table: " + chalk.bold(seeder.table))
    }
})

;(async () => {
    // Connect to database
    global.db = await createConnection()

    try {
        await runnable()
    } catch(error) {
        console.error(error)
    } finally {
        db.end()
    }
})()