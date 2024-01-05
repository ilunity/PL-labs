const express = require('express');
const generatePassword = require("../utils/generate-password");
const passwordStorage = require('../utils/password-storage');

const router = express.Router();

router.post('/generate', async (req, res, next) => {
    const {length, symbols, count} = req.body;

    const passwords = [];
    for (let i = 0; i < count; i++) {
        passwords.push(generatePassword(symbols, length));

    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    await passwordStorage.addPasswords(ip, req.headers, passwords);

    res.send(passwords);
});

module.exports = router;
