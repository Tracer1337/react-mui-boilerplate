const { v4: uuid } = require("uuid")
const fs = require("fs")
const path = require("path")
const AWS = require("aws-sdk")

const s3 = new AWS.S3({ apiVersion: "2006-03-01" })

const ROOT_DIR = path.join(__dirname, "..", "..")
const DEV_BUCKET_DIR = path.join(ROOT_DIR, process.env.AWS_BUCKET)
const LOCAL_STORAGE_DIR = path.join(ROOT_DIR, "storage")

const cache = new Map()

async function clearFolder(folder) {
    const files = await fs.promises.readdir(folder)
    await Promise.all(files.map(async filename => {
        await fs.promises.unlink(path.join(folder, filename))
    }))
}

const StorageFacade = {
    createBucket(bucketName = process.env.APP_NAME + "-" + uuid()) {
        if (process.env.NODE_ENV === "development") {
            fs.mkdirSync(path.join(ROOT_DIR, bucketName))
            return { Bucket: bucketName }
        }

        return new Promise((resolve, reject) => {
            s3.createBucket({ Bucket: bucketName }, (error, data) => {
                if (error) {
                    return reject(error)
                }

                resolve({ ...data, Bucket: bucketName })
            })
        })
    },

    uploadFile(inputPath, outputPath, bucketName = process.env.AWS_BUCKET) {
        const fileName = path.basename(outputPath)

        cache.set(fileName, fs.readFileSync(inputPath))

        if (process.env.NODE_ENV === "development") {
            return fs.copyFileSync(inputPath, path.join(ROOT_DIR, bucketName, fileName))
        }

        return new Promise((resolve, reject) => {
            const fileStream = fs.createReadStream(inputPath)

            fileStream.on("error", error => reject(error))

            const params = {
                Bucket: bucketName,
                Key: outputPath,
                Body: fileStream
            }

            s3.upload(params, (error, data) => {
                if (error) {
                    return reject(error)
                }

                resolve(data)
            })
        })
    },

    getFile(filePath, bucketName = process.env.AWS_BUCKET) {
        const fileName = path.basename(filePath)

        if (cache.has(fileName)) {
            return cache.get(fileName)
        }

        return new Promise((resolve, reject) => {
            let stream

            if (process.env.NODE_ENV === "development") {
                stream = fs.createReadStream(path.join(DEV_BUCKET_DIR, fileName))
            } else {
                const params = {
                    Bucket: bucketName,
                    Key: filePath
                }

                stream = s3.getObject(params).createReadStream()
            }

            const buffers = []

            stream.on("error", reject)

            stream.on("data", (chunk) => buffers.push(chunk))

            stream.on("end", () => {
                const buffer = Buffer.concat(buffers)
                cache.set(fileName, buffer)
                resolve(buffer)
            })
        })
    },

    deleteFile(filePath, bucketName = process.env.AWS_BUCKET) {
        const fileName = path.basename(filePath)

        cache.delete(fileName)

        return new Promise(resolve => {
            if (process.env.NODE_ENV === "development") {
                fs.unlinkSync(path.join(DEV_BUCKET_DIR, fileName))
                resolve(true)
            } else {
                const params = {
                    Bucket: bucketName,
                    key: filePath
                }

                s3.deleteObject(params, (error, data) => {
                    if (error) {
                        return resolve(false)
                    }

                    resolve(true)
                })
            }
        })
    },

    clearStorage: clearFolder.bind(null, DEV_BUCKET_DIR),


    uploadFileLocal(inputPath, filename) {
        return fs.promises.copyFile(inputPath, path.join(LOCAL_STORAGE_DIR, filename))
    },

    deleteFileLocal(filename) {
        return fs.promises.unlink(path.join(LOCAL_STORAGE_DIR, filename))
    },

    clearLocalStorage: clearFolder.bind(null, LOCAL_STORAGE_DIR),
}

module.exports = StorageFacade