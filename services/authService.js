const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { jwtSecret, jwtExpiresIn } = require('../config/config');

async function login(username, password) {
    const user = await User.findOne({ username }).populate('role');
    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid username or password');
    }

    const payload = {
        userUid: user.userUid,
        username: user.username,
        role: user.role.name
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });

    return { token, user: payload };
}

module.exports = { login };
