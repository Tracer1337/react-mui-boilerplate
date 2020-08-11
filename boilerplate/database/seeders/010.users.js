const bcrypt = require("bcrypt")
const moment = require("moment")
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") })

module.exports = {
    table: "users",

    rows: ({ uuid }) => [
        [uuid(), "test@mail.com", bcrypt.hashSync("123456", +process.env.SALT_ROUNDS), moment().format("YYYY-MM-DD HH:mm:ss")]
    ]
}