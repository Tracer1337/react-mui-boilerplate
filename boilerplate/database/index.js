const mysql = require("mysql")
const chalk = require("chalk")

// Create database 
function getConnection() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
}

// Connect to database
function createConnection() {
    return new Promise((resolve) => {
        const connection = getConnection()

        connection.connect((error) => {
            if(error) throw error
            
            console.log(chalk.green("Connected to database"))
            resolve(connection)
        })
    })
}

module.exports = createConnection