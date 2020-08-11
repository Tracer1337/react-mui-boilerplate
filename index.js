#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { makeRunnable, exec, run } = require("@m.moelter/task-runner")

const appName = process.argv[2]

if (!appName) {
    console.log("\nMissing app name (First argument)")
    process.exit()
}

const FOLDER_PATH = path.join(process.cwd(), appName)

makeRunnable(async () => {
    /**
     * Clone git repository into new folder with name appName
     */
    await run(async () => {
        await exec(`git clone https://github.com/Tracer1337/react-mui-boilerplate.git ${appName}`, { skipErrors: true })
    }, "Cloning git repository")

    /**
     * Set up files and folders
     */
    await run(async () => {
        /**
         * Move into new folder and remove .git folder
         */
        process.chdir(appName)

        fs.rmdirSync(path.join(FOLDER_PATH, ".git"), { recursive: true })

        /**
         * Replace {APP_NAME} with appName in: package.json, .env, manifest.json, index.html
         */
        const replaceAppNameInFiles = [
            "boilerplate/package.json",
            "boilerplate/.env",
            "boilerplate/client/public/manifest.json",
            "boilerplate/client/public/index.html"
        ]

        for (let relativePath of replaceAppNameInFiles) {
            const filePath = path.join(FOLDER_PATH, relativePath)

            const content = fs.readFileSync(filePath, "utf8")

            const patched = content.replace(/{APP_NAME}/g, appName)

            fs.writeFileSync(filePath, patched, "utf8")
        }

        /**
         * Add .env to .gitignore
         */
        const gitignorePath = path.join(FOLDER_PATH, "boilerplate", ".gitignore")
        const gitignore = fs.readFileSync(gitignorePath, "utf8")

        const gitignorePatched = gitignore + "\n.env"

        fs.writeFileSync(gitignorePath, gitignorePatched)

        /**
         * Remove all files / folders but boilerplate/ from the new folder
         */
        const shouldDeleteFiles = fs.readdirSync(FOLDER_PATH).filter(filename => filename !== "boilerplate")

        for (let filename of shouldDeleteFiles) {
            fs.unlinkSync(path.join(FOLDER_PATH, filename))
        }

        /**
         * Move all contents from boilerplate/ out of the folder and delete boilerplate folder
         */
        const shouldMoveFiles = fs.readdirSync(path.join(FOLDER_PATH, "boilerplate"))

        for (let filepath of shouldMoveFiles) {
            const oldPath = path.join(FOLDER_PATH, "boilerplate", filepath)
            const newPath = path.join(FOLDER_PATH, filepath)

            fs.renameSync(oldPath, newPath)
        }

        fs.rmdirSync(path.join(FOLDER_PATH, "boilerplate"))
    }, "Setting up files")

    /**
     * Install npm packages for client and server
     */
    await run(async () => {
        await exec("npm install")

        await exec("cd client && npm install")
    }, "Installing npm packages")

    /**
     * Init git repository (add, commit)
     */
    await run(async () => {
        await exec([
            "git init",
            "git add .",
            "git commit -m \"First commit\""
        ], { skipErrors: true })
    }, "Initializing git")

    // Prompt the user for a git remote

    // If given

        // Push to remote

    /**
     * Open VSCode in the new folder (command "code <folder>")
     */
    await run(async () => {
        await exec("code .", { skipErrors: true })
    }, "Opening VSCode")

    /**
     * Start development server
     */
    await run(async () => {
        await exec("npm run start")
    })
})()