module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || '4kifpdCLqd',
        password: process.env.MYSQL_PASS || '6Ge3FvupfW',
        database: process.env.MYSQL_DB || '4kifpdCLqd',
    },
}