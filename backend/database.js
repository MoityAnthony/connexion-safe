const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, password TEXT, secret TEXT)");
    const bcrypt = require('bcryptjs');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('password123', salt);
    db.run("INSERT INTO users (email, password, secret) VALUES (?, ?, ?)", ['test@example.com', hash, '']);
});

module.exports = db;