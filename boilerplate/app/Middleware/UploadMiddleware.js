const path = require("path")
const multer = require("multer")

const ROOT_DIR = path.join(__dirname, "..", "..")

const { randomFileName, getFileExtension } = require("../utils")

/**
 * Create preset for file upload middleware
 */
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            const folder = path.join(ROOT_DIR, "temp")
            callback(null, folder)
        },

        filename: (req, file, callback) => {
            const filename = randomFileName() + getFileExtension(file.originalname)
            callback(null, filename)
        }
    })
})

module.exports = upload