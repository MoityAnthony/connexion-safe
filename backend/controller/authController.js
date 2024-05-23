const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const UserModel = require('../models/userModel');

exports.login = (req, res) => {
    const { email, password } = req.body;
    UserModel.findByEmail(email, (err, user) => {
        if (err) return res.status(500).send('Server error');
        if (!user) return res.status(401).send('Invalid email or password');

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return res.status(401).send('Invalid email or password');

        res.status(200).send();
    });
};

exports.verify2FA = (req, res) => {
    const { email, code } = req.body;
    UserModel.findByEmail(email, (err, user) => {
        if (err) return res.status(500).send('Server error');
        if (!user) return res.status(401).send('Invalid 2FA code');

        const verified = speakeasy.totp.verify({
            secret: user.secret,
            encoding: 'base32',
            token: code
        });

        if (!verified) return res.status(401).send('Invalid 2FA code');

        res.status(200).send();
    });
};