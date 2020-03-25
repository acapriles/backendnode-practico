const express = require('express');
//const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const config = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const post = require('./components/post/network');
const errors = require('../network/errors');

// Inicializando Express
const app = express();

//app.use(bodyParser.json());

// Con estas 2 lineas evito instalar el body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerDoc = require('./swagger.json');

// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errors);

// Levantando el servidor
app.listen(config.api.port, () => {
    console.log('API escuchando en el puerto ', config.api.port);
});

