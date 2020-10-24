const bcrypt = require("bcrypt")
const faker = require("faker")
const moment = require("moment")
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") })

const User = require("../../app/Models/User.js")

function randomTimestamp() {
    const offset = Math.random() * 1000 * 3600 * 24 * 7
    return moment(moment() - offset)
}

module.exports = {
    table: "users",

    run: async () => {
        const data = [
            ["first_user", "test@mail.com", bcrypt.hashSync("12345678", +process.env.SALT_ROUNDS)],
            ["second_user", "test2@mail.com", bcrypt.hashSync("12345678", +process.env.SALT_ROUNDS)]
        ]

        for (let i = 0; i < 20; i++) {
            data.push([faker.internet.userName(), faker.internet.email(), bcrypt.hashSync("12345678", +process.env.SALT_ROUNDS)])
        }

        for (let [username, email, password] of data) {
            const user = new User({ created_at: randomTimestamp(), username, email, password })
            await user.store()
        }
    }
}