# React Mui Boilerplate

### Available Scripts

##### start

Starts the server as well as the client's dev-server. The dev-server will be proxied to "/" by default, but this route can be edited in routes/index.js.

##### jwt-secret

Generates a JWT secret, which you must copy and paste into the .env file (JWT_SECRET = ...)

##### setup-db

Runs the migrate and seed scripts.

##### migrate

Drops all tables in the database and runs the migrations defined in database/migrations.

##### seed

Seeds the database with the seeders defined in database/seeders

##### deploy

Sets up a new version of the app, pushes it to the git remote and pulls it to the server. The connection with the server will be established through SSH using the credentials defined in .env.