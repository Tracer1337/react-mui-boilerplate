const fs = require("fs")
const path = require("path")
const { program } = require("commander")
const NodeSSH = require("node-ssh")
const { makeRunnable, exec, run } = require("@m.moelter/task-runner")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

const ssh = new NodeSSH()
const ROOT_DIR = path.join(__dirname, "..")

const EDITOR_BUILD_DIR = path.join(ROOT_DIR, "client", "", "build")
const EDITOR_OUTPUT_DIR = path.join(ROOT_DIR, "public", "editor")

program
    .option("-b, --build", "create a new react production build")
    .parse(process.argv)


/**
 * Main function
 */

makeRunnable(async () => {
    if (program.build) {
        // Create react production build
        await run(createBuild, "Create react production build")

        // Put build into desired destination
        await run(moveBuild, "Put build into desired destination")
    }

    // Connect to server via SSH
    await run(connectSSH, "Connect to server")

    // Deploy new version on server
    await run(deploySSH, "Deploy new version")
})()


/**
 * Service functions
 */

async function createBuild() {
    await exec("cd client && npm run build")
}

async function moveBuild() {
    try {
        // Remove old react build
        fs.rmdirSync(EDITOR_OUTPUT_DIR, { recursive: true })

        // Move build to output
        fs.renameSync(EDITOR_BUILD_DIR, EDITOR_OUTPUT_DIR)
    } catch (error) {
        throw new Error(error)
    }
}

async function connectSSH() {
    await ssh.connect({
        host: process.env.SSH_HOST,
        username: process.env.SSH_USERNAME,
        privateKey: path.resolve(ROOT_DIR, process.env.SSH_PRIVATE_KEY)
    })
}

async function deploySSH() {
    await ssh.putDirectory(path.join(ROOT_DIR, "public"), `/var/www/${process.env.APP_NAME}/public`, {
        recursive: true,

        tick: (localPath, remotePath, error) => {
            if (error) {
                console.log(error)
            }
        }
    })

    ssh.dispose()
}