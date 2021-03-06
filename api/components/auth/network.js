const express = require('express');
const response = require('../../../network/response');

const router = express.Router();
// const Controller = require('./controller');
const Controller = require('./index');

// Routes
router.post('/login', login);

// Internal functions
function login(req, res, next) {
    Controller.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req, res, token, 200);
        })
        .catch(next);
        //.catch((err) => {
        //    response.error(req, res, 'Información inválida', 400);
        //});
}

module.exports = router;