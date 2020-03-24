const nanoid = require('nanoid'); //Generador de ID
const auth = require('../auth');

const TABLA = 'user';

// Controlador como una función.
module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, user);
    }

    return {
        list,
        get,
        upsert,
    };
}


/*
const store = require('../../../store/dummy');

const TABLA = 'user';

function list() {
    return store.list(TABLA);
}

module.exports = {
    list,
};
 */