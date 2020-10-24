const User = require("../Models/User.js")
const AuthServiceProvider = require("../Services/AuthServiceProvider.js")

async function register(req, res) {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: await AuthServiceProvider.hashPassword(req.body.password)
    })

    await user.store()

    const token = AuthServiceProvider.generateToken(user.id)

    res.send({ token, user })
}

async function login(req, res) {
    const user = await User.findBy("email", req.body.email)

    if (!await AuthServiceProvider.validatePassword(req.body.password, user.password)) {
        return res.status(401).send({
            password: {
                message: "Wrong password"
            }
        })
    }

    const token = AuthServiceProvider.generateToken(user.id)

    res.send({ token, user })
}

module.exports = { register, login }