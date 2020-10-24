// Source: https://stackoverflow.com/a/14075810/9074399
const EMAIL_REGEX = new RegExp(`([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+`)

const USERNAME_REGEX = /^[\w]{3,}$/

/**
 * Creates an express middleware function which validates the
 * given input fields and returns an error if one of the validators fails.
 */
class Validator {
    constructor() {
        this.queue = []

        for (let name in Validator.validators) {
            this[name] = this.addValidation.bind(this, Validator.validators[name])
        }
    }

    /**
     * Add a validator the the validation queue
     * Return the middleware function and assign all methods of this object to the function to allow method chaining.
     */
    addValidation(validator, name, options) {
        this.queue.push({ name, options, ...validator })
        return Object.assign(this.run.bind(this), this)
    }

    /**
     * Execute the given validators from the queue on the req.body object.
     * Send an error to the client if any one of the validator fails.
     */
    async run(req, res, next) {
        const errors = {}

        for (let { name, validate, constraints, options } of this.queue) {
            let error = false

            if (!(name in req.body)) {
                error = {
                    message: "Missing field"
                }
            } else if (!validate(req.body[name], options)) {
                error = {
                    message: "Invalid value",
                    constraints: typeof constraints === "function" ? constraints(options) : constraints
                }
            } else if (options) {
                if (options.uniqueIn && await options.uniqueIn.findBy(name, req.body[name])) {
                    error = {
                        message: "Already taken"
                    }
                } else if (options.existsIn && !(await options.existsIn.findBy(name, req.body[name]))) {
                    error = {
                        message: "Not found"
                    }
                }
            }

            if (error) {
                errors[name] = error
            }
        }
        
        if (Object.keys(errors).length > 0) {
            return res.status(400).end(JSON.stringify(errors, null, 4))
        } else {
            next()
        }
    }
}

/**
 * Validators
 */

Validator.validators = {
    email: {
        validate: (value) => EMAIL_REGEX.test(value)
    },

    password: {
        validate: (value) => value.length >= 8,
        constraints: "at least 8 characters"
    },

    username: {
        validate: (value) => USERNAME_REGEX.test(value),
        constraints: "only alphanumeric characters and at least 3"
    },

    oneOf: {
        validate: (value, { values }) => values.includes(value),
        constraints: ({ values }) => `one of: ${values.join(", ")}`
    }
}

module.exports = Validator