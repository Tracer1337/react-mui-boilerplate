const User = require("../Models/User.js")
const AuthServiceProvider = require("../Services/AuthServiceProvider.js")

/**
 * Convert the given token to a user object
 */
async function ProtectMiddleware(req, res, next) {
    if (!req.header("Authorization")) {
        return res.sendStatus(401)
    }

    const token = req.header("Authorization").split(" ")[1]

    let userId

    try {
        userId = await AuthServiceProvider.verifyToken(token)
    } catch {
        return res.status(401).send("Invalid token")
    }

    const user = await User.findBy("id", userId)

    if (!user) {
        return res.status(401).send("Invalid token")
    }

    await user.init()

    req.user = user

    next()
}

function Admin(req, res, next) {
    ProtectMiddleware(req, res, () => {
        if (!req.user.is_admin) {
            return res.sendStatus(403)
        }

        next()
    })
}

Object.assign(ProtectMiddleware, { Admin })

module.exports = ProtectMiddleware 