#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { program } = require("commander")
const { makeRunnable, exec, run } = require("@m.moelter/task-runner")

program
    .options("-r, --remote", "git remote, where the new repo will be pushed to")
    .parse(process.argv)

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
        const deleteFiles = fs.readdirSync(FOLDER_PATH).filter(filename => filename !== "boilerplate")

        for (let filename of deleteFiles) {
            fs.unlinkSync(path.join(FOLDER_PATH, filename))
        }

        /**
         * Move all contents from boilerplate/ out of the folder and delete boilerplate folder
         */
        const moveFiles = fs.readdirSync(path.join(FOLDER_PATH, "boilerplate"))

        for (let filepath of moveFiles) {
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
        return
        await exec("npm install", { skipErrors: true })

        await exec("cd client && npm install", { skipErrors: true })
    }, "Installing npm packages (this may take a while)")

    /**
     * Init git repository (add, commit)
     */
    await run(async () => {
        await exec([
            "git init",
            "git add .",
            "git commit -m \"First commit\""
        ], { skipErrors: true })

        if (program.remote) {
            await exec([
                `git remote add origin ${program.remote}`,
                "git push -u origin master"
            ], { skipErrors: true })
        }
    }, "Initializing git")

    /**
     * Open VSCode in the new folder (command "code <folder>")
     */
    await exec("code .", { skipErrors: true })
})()