<h1 align="center">React Mui Boilerplate</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/react-mui-boilerplate">
        <img src="https://img.shields.io/bundlephobia/min/react-mui-boilerplate" alt="Size" /></a>
    <a href="https://www.npmjs.com/package/react-mui-boilerplate">
        <img src="https://img.shields.io/npm/dm/react-mui-boilerplate" alt="Downloads" /></a>
    <a href="https://github.com/Tracer1337/react-mui-boilerplate">
        <img src="https://img.shields.io/github/stars/Tracer1337/react-mui-boilerplate?style=social" alt="Stars" /></a>
</p>

A powerful boilerplate for using react with material-ui in the frontend and express in the backend. Redux, react-redux and react-router-dom are also preinstalled.

### Quick Start

```bash
npx react-mui-boilerplate my-app
cd my-app
npm start
```

### Arguments

``--remote https://github.com/username/my-repo.git`` When a git remote is specified, it will be set as the origin and a first commit will be pushed automatically.

### Project structure

```
| -- app
|  | -- Controllers
|  |  | -- AuthController.js
|  | -- Middleware
|  |  | -- ProtectMiddleware.js
|  | -- Models
|  |  | -- User.js
|  | -- Services
|  |  | -- AuthServiceProvider.js
|  | -- utils
|  |  | -- index.js
| -- client
|  | -- public
|  |  | -- index.html
|  |  | -- manifest.json
|  | -- src
|  |  | -- assets
|  |  | -- components
|  |  | -- config
|  |  |  | -- api.js
|  |  |  | -- constants.js
|  |  |  | -- formatAPI.js
|  |  | -- pages
|  |  |  | -- IndexPage.js
|  |  | -- router
|  |  |  | -- index.js
|  |  | -- store
|  |  |  | -- reducers
|  |  |  |  | -- auth.js
|  |  |  |  | -- root.js
|  |  |  | -- actions.js
|  |  |  | -- actionTypes.js
|  |  |  | -- index.js
|  |  | -- utils
|  |  |  | -- Analytics.js
|  |  |  | -- useAPIData.js
|  |  | -- App.js
|  |  | -- index.css
|  |  | -- index.js
|  |  | -- serviceWorker.js
|  | -- .env
|  | -- .gitignore
|  | -- .package.json
| -- database
|  | -- migrations
|  |  | -- 010.users.js
|  | -- seeders
|  |  | -- 010.users.js
|  | -- index.js
| -- lib
|  | -- Collection.js
|  | -- Model.js
| -- public
| -- routes
|  | -- api.js
|  | -- index.js
| -- scripts
|  | -- deploy.js
|  | -- jwt-secret.js
|  | -- migrate.js
|  | -- seed.js
|  | -- start-server.js
| -- .env
| -- .gitignore
| -- idea.md
| -- package.json
| -- README.md
| -- server.js
```