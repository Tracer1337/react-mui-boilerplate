const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const { makeRunnable, run } = require("@m.moelter/task-runner")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

const { queryAsync } = require("../app/utils")
const createConnection = require("../database")
const StorageFacade = require("../app/Facades/StorageFacade.js")

const ROOT_DIR = path.join(__dirname, "..")
const MIGRATIONS_DIR = path.join(ROOT_DIR, "database", "migrations")

const runnable = makeRunnable(async () => {
    // Require migrations from migrations folder
    const migrations = (await fs.promises.readdir(MIGRATIONS_DIR)).map(filename => require(path.join(MIGRATIONS_DIR, filename)))

    await run(async () => {
        const reversedMigrations = [...migrations].reverse()
        const query = `DROP TABLE IF EXISTS ${reversedMigrations.map(migration => migration.table).filter(e => e).join(",")}`
        await queryAsync(query)
    }, "Removing tables")

    await run(async () => {
        await Promise.all([
            StorageFacade.clearStorage(),
            StorageFacade.clearLocalStorage()
        ])
    }, "Removing files")

    for (let migration of migrations) {
        if (!migration.columns) {
            continue
        }

        const query = `
            CREATE TABLE ${migration.table} (
                ${migration.columns.join(",\n")}
            );
        `

        await run(async () => await queryAsync(query), "Creating table: " + chalk.bold(migration.table))
    }
})

;(async () => {
    // Create database connection
    global.db = await createConnection()

    try {
        await runnable()
    } catch(error) {
        console.error(error)
    } finally {
        db.end()
    }
})()
