const Collection = require("./Collection.js")
const { queryAsync } = require("../app/utils")

const requiredProps = ["table", "columns"]
const commonProps = ["table", "columns", "defaultValues"]

/**
 * Class representing a Model. Strictly bound to the database.
 * 
 * @attribute {String} table - The name of the table bound to the model
 * @attribute {String[]} columns - The column names of the table in the correct order
 */
class Model {
    /**
     * Select all matches for the given SQL selector and return a
     * collection containing models for all rows in the query result
     */
    static async where(selector, options = {}) {
        // Get matches from database
        const query = `SELECT * FROM ${this.table} WHERE ${selector}`
        const results = await queryAsync(query)

        // Create models from results
        const models = await Promise.all(results.map(async row => {
            const model = new this.model(row)

            if(model.init) {
                await model.init(options.initArgs)
            }

            return model
        }))

        return new Collection(models)
    }

    /**
     * Create a model from the first match for 'column = value'
     */
    static async findBy(column, value, options) {
        return (await Model.where.call(this, `${column} = '${value}'`, options))[0]
    }

    /**
     * Create a collection from all matches for 'column = value'
     */
    static async findAllBy(column, value, options) {
        return await Model.where.call(this, `${column} = '${value}'`, options)
    }

    /**
     * Create a collection from all entries
     */
    static async getAll(options) {
        return await Model.where.call(this, "1", options)
    }

    /**
     * Create models from database results
     */
    static fromRows(rows) {
        return new Collection(rows.map(row => new this.model(row)))
    }

    /**
     * Pass all static methods from Model to the given class
     */
    static bind(cls, table) {
        cls.table = table

        Object.getOwnPropertyNames(Model)
            .filter(prop => typeof Model[prop] === "function")
            .forEach(prop => cls[prop] = Model[prop].bind({ model: cls, table }))
    }

    /**
     * Store the model into the database
     */
    async store() {
        const query = `INSERT INTO ${this.table} SET ?`
        await queryAsync(query, this.getColumns())
    }

    /**
     * Update the model in the database
     */
    async update() {
        const query = `UPDATE ${this.table} SET ? WHERE id = '${this.id}'`
        await queryAsync(query, this.getColumns())
    }

    /**
     * Delete the model from the database
     */
    async delete() {
        const query = `DELETE FROM ${this.table} WHERE id = '${this.id}'`
        await queryAsync(query)
    }

    /**
     * Create a new instance of the model and pass all attributes of this
     */
    clone() {
        return new this.constructor(this)
    }

    /**
     * Create a column map (column_name: value)
     */
    getColumns() {
        const values = {}
        this.columns.forEach(column => {
            if (this[column]) {
                if (this[column].constructor.name === "Object") {
                    values[column] = JSON.stringify(this[column])
                } else {
                    values[column] = this[column]
                }
            }
        })
        return values
    }

    /**
     * Create a model
     */
    constructor(props) {
        // Check if the required attributes are defined
        requiredProps.forEach(attribute => {
            if (!props[attribute]) {
                throw new Error(`The attribute '${attribute}' is missing in model "${this.constructor.name}"`)
            }
        })

        // Assign props to this
        for(let key in props) {
            if (commonProps.includes(key)) {
                this[key] = props[key]
            } else if (props.columns.includes(key)) {
                this[key] = props[key]
            }
        }

        // Fill empty values with default values
        for (let key in this.defaultValues) {
            if (!this.columns.includes(key)) {
                console.error(`Unknown key '${key}'. Default values are ment to fill empty columns`)
            }

            if (!this[key]) {
                const getter = this.defaultValues[key]

                if (typeof getter === "function") {
                    this[key] = getter()
                } else {
                    this[key] = getter
                }
            }
        }
    }
}

module.exports = Model