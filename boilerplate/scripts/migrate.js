const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const { performance } = require("perf_hooks")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

const { createConnectionAsync } = require("../database")

const MIGRATIONS_DIR = path.join(__dirname, "..", "database", "migrations")

let db

// Run db.query promise-based
function asyncQuery(query) {
    return new Promise((resolve) => {
        db.query(query, (error) => {
            if(error) throw error
            resolve()
        })
    })
}

;(async () => {
    // Create database connection
    db = await createConnectionAsync()

    try {
        run()
    } catch(error) {
        console.error(error)
        db.end()
    }
})()

// Run migrations
function run() {
    // Get all migration files
    fs.readdir(MIGRATIONS_DIR, async (error, files) => {
        if (error) throw error

        // Create migrations array
        const migrations = files.map(filename => require(path.join(MIGRATIONS_DIR, filename)))

        // Drop all tables
        console.log(chalk.bold("Remove tables"))

        const reversedMigrations = [...migrations].reverse()
        const query = `DROP TABLE IF EXISTS ${reversedMigrations.map(migration => migration.table).filter(e => e).join(",")}`
        await asyncQuery(query)

        const startTime = performance.now()
        console.log(chalk.bold("Create tables"))

        // Create tables
        for (let migration of migrations) {
            if (!migration.columns) {
                continue
            }

            console.log("   Creating " + migration.table)

            // Generate query
            const query = `
                CREATE TABLE ${migration.table} (
                    ${migration.columns.join(",\n")}
                );
            `
            
            // Run query
            await asyncQuery(query)

            console.log(chalk.green("   Created successfully"))
        }

        const elapsedTime = Math.floor(performance.now() - startTime)
        console.log("Executed in " + chalk.cyan(elapsedTime + "ms"))

        // Disconnect from database
        db.end()
    })
}
