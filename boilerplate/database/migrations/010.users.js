module.exports = {
    table: "users",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "username varchar(255) NOT NULL UNIQUE",
        "email varchar(255) NOT NULL UNIQUE",
        "password varchar(255) NOT NULL",
        "avatar_filename varchar(255)",
        "created_at varchar(255) NOT NULL",
        "is_admin bit(1) NOT NULL DEFAULT 0"
    ]
}