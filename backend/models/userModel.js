const db = require('../database');

class UserModel {
    static findByEmail(email, callback) {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.get(query, [email], callback);
    }

    static createUser(email, password, secret, callback) {
        const query = "INSERT INTO users (email, password, secret) VALUES (?, ?, ?)";
        db.run(query, [email, password, secret], callback);
    }
}

module.exports = UserModel;