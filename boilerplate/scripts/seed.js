const { v4: uuid } = require("uuid")
const fs = require("fs")
const path = require("path")
const { performance } = require("perf_hooks")
const chalk = require("chalk")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

const { createConnectionAsync } = require("../database")

const SEEDERS_DIR = path.join(__dirname, "..", "database", "seeders")

let db

// Run db.query promise-based
function asyncQuery(query) {
    return new Promise((resolve) => {
        db.query(query, (error, results) => {
            if (error) throw error
            resolve(results)
        })
    })
}

;(async () => {
    // Connect to database
    db = await createConnectionAsync()

    try {
        await run()
    } catch(error) {
        console.error(error)
        db.end()
    }
})()

// Run seeds
async function run() {
    // Get all seeders from seed directory
    const seeders = fs.readdirSync(SEEDERS_DIR)
                        .filter(filename => filename.endsWith(".js"))
                        .map(filename => require(path.join(SEEDERS_DIR, filename)))

    // Run seeders from files
    const startTime = performance.now()
    console.log(chalk.bold("Seed tables"))

    for(let seeder of seeders) {
        if(!seeder.rows) {
            continue
        }

        console.log("   Seeding " + seeder.table)

        // Fetch rows from seeder
        const rows = typeof seeder.rows === "function" ? await seeder.rows({ db, query: asyncQuery, uuid }) : seeder.rows

        // Insert all rows into the specified table
        const query = `
            INSERT INTO ${seeder.table} 
            VALUES (${rows
                        .map(row => 
                            row.map(value => `'${value}'`)
                            .join(","))
                        .join("),(")}
                    )
        `
        
        await asyncQuery(query)

        console.log(chalk.green("   Seeded successfully"))
    }

    const elapsedTime = Math.floor(performance.now() - startTime)
    console.log("Executed in " + chalk.cyan(elapsedTime + "ms"))

    db.end()
}