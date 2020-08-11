module.exports = {
    table: "users",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "email varchar(255) NOT NULL UNIQUE",
        "password varchar(255) NOT NULL",
        "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    ]
}