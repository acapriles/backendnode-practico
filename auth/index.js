const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret, {expiresIn: 60 * 60 * 24}); // expires in 24 hours
}

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        if (decoded.id !== owner) {
            throw error('No puedes hacer esto', 401);
            //throw new Error('No puedes hacer esto');
        }
    },
    logged: function(req) {
        const decoded = decodeHeader(req);
        console.log(decoded);
    },
}

function getToken(auth) {
    if (!auth) {
        throw error('No viene token', 401);
        //throw new Error('No viene token');
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato invalido', 401);
        //throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};