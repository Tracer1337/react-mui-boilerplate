const { v4: uuid } = require("uuid")
const fs = require("fs")
const path = require("path")

const ROOT_DIR = path.join(__dirname, "..", "..")

/**
 * Run db.query promise-based
 */
function queryAsync(query, ...props) {
    // Replace "null" and "undefined" with NULL
    query = query.replace(/['"](null|undefined)['"]/g, "NULL")
    
    return new Promise((resolve, reject) => {
        db.query(query, ...props, (error, result) => {
            if (error) {
                console.error(error)
                reject()
            }

            resolve(result)
        })
    })
}

/**
 * Convert array to list to be used in a SQL query
 * Example: [1, 2, 3] => "('1', '2', '3')"
 */
function quotedList(array) {
    return `(${array.map(element => `'${element}'`).join(",")})`
}

function randomFileName() {
    return uuid().match(/([^-]*)/)[0]
}

function getFileExtension(filename) {
    return filename.match(/\.[0-9a-z]+$/i)[0]
}

/**
 * Store buffer to temp file and return a custom file handle
 */
async function createTempFile(buffer, extension) {
    const filename = randomFileName() + "." + extension
    const filePath = path.join(ROOT_DIR, "temp", filename)

    await fs.promises.writeFile(filePath, buffer)

    return {
        filename,
        path: filePath,
        delete: () => fs.promises.unlink(filePath)
    }
}

/**
 * Replace the current file-extension with a new one
 */
function changeExtension(filename, newExtension) {
    return filename.replace(/\.\w+/, "." + newExtension)
}

/**
 * Remove the file-extension
 */
function removeExtension(filename) {
    return filename.replace(/\..*$/, "")
}

/**
 * Check if a filename has an extension
 */
function hasExtension(filename) {
    return /[^.]*\..*/.test(filename)
}

/**
 * Extract chunk out of array
 */
function paginate(array, page, itemsPerPage) {
    const start = itemsPerPage * page
    const end = start + itemsPerPage
    return array.slice(start, end)
}

module.exports = {
    queryAsync,
    quotedList,
    randomFileName,
    getFileExtension,
    createTempFile,
    changeExtension,
    removeExtension,
    hasExtension,
    paginate
}