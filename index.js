#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { makeRunnable, exec, run } = require("@m.moelter/task-runner")

const appName = process.argv[2]

if (!appName) {
    console.log("\nMissing app name (First argument)")
    process.exit()
}

const FOLDER_PATH = path.join(__dirname, appName)

makeRunnable(async () => {
    // Create new folder with name appName
    fs.mkdirSync(FOLDER_PATH)

    // Pull git repository into new folder
    await run(async () => {
        exec([
            "cd " + FOLDER_PATH,
            "git pull ..."
        ])
    })

    // Remove .git folder

    // Replace {APP_NAME} with appName in: package.json, .env, manifest.json, index.html

    // Add .env to .gitignore

    // Remove all files / folders but boilerplate/ from the new folder

    // Move all contents from boilerplate/ out of the folder

    // Delete the (now empty) boilerplate folder

    // Init git repository (add, commit)

    // Prompt the user for a git remote

    // If given

        // Push to remote

    // Open VSCode in the new folder (command "code <folder>")
})()