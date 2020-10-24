class Collection {
    constructor(models) {
        if(!models) {
            throw new Error("Models is not defined")
        }

        this.models = models

        this.isSorted = false

        /**
         * Map all array methods of this.models to this
         */
        const methods = Object.getOwnPropertyDescriptors(Array.prototype)
        delete methods.constructor

        Object.keys(methods).forEach(method => {
            if (typeof methods[method].value === "function") {
                this[method] = (...args) => this.models[method](...args)
            }
        })

        /**
         * Proxy indices (collection[<Index>]) to this.models
         */
        return new Proxy(this, {
            get(target, prop) {
                if (typeof prop !== "symbol" && +prop == prop && !(prop in target)) {
                    return target.models[prop]
                }
                return target[prop]
            }
        })
    }

    /**
     * Get the length of the models array
     */
    get length() { return this.models.length }

    /**
     * Map over models with an async function
     */
    async mapAsync(fn) {
        return Promise.all(this.map(fn))
    }

    /**
     * Get a random model from the models array
     */
    random() {
        return this.models[Math.floor(Math.random() * this.models.length)]
    }

    /**
     * Make for ... of loops available
     */
    [Symbol.iterator]() {
        return this.models.values()
    }

    toJSON() {
        return this.models
    }
}

module.exports = Collection