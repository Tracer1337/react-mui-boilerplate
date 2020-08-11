const { v4: uuid } = require("uuid")
const bcrypt = require("bcrypt")
const moment = require("moment")

const User = require("../Models/User.js")
const { generateJWT } = require("../utils")

// Validate inputs from /register and /login route
function validateAuth(req, res) {
    if(!req.body.email || !req.body.password) {
        res.status(400)
        res.end()
        return false
    }

    return true
}

// Validate inputs from /register route
async function validateRegister(req, res) {
    if(!validateAuth(req, res)) {
        return false
    }

    // Check if email address already exists
    if(await User.findBy("email", req.body.email)) {
        res.status(409)
        res.end()
        return false
    }

    return true
}

function validateLogin(req, res) {
    return validateAuth(req, res)
}

// Create new user and store into database
async function createUser({ email, password }) {
    // Hash password
    const hash = await bcrypt.hash(password, +process.env.SALT_ROUNDS)

    // Create new user
    const userId = uuid()
    const user = new User({
        id: userId,
        email,
        password: hash,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
    })

    // Store user in database
    await user.store()

    return user
}

// Log user in
async function loginUser({ email, password }, res) {
    // Get user with email from database
    const user = await User.findBy("email", email)

    if(!user) {
        res.status(404)
        res.end()
        return
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) {
        res.status(401)
        res.end()
        return
    }
    
    return user
}

// Generate JWT for user
function generateToken(user) {
    return generateJWT({ id: user.id })
}

module.exports = {
    createUser,
    loginUser,
    validateRegister,
    validateLogin,
    generateToken
}