const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

function authorize(req) {
    return (
        req.header("Authorization") &&
        req.header("Authorization") === process.env.UPLOAD_PASSWORD
    )
}

function generateToken(input) {
    return jwt.sign(input, process.env.JWT_SECRET)
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) reject(error)
            else resolve(decoded)
        })
    })
}

function hashPassword(password) {
    return bcrypt.hash(password, +process.env.SALT_ROUNDS)
}

function validatePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
}

module.exports = { authorize, generateToken, verifyToken, hashPassword, validatePassword }