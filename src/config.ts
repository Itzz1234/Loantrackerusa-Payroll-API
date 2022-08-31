require('dotenv').config('../.env');

export default {
    PORT: process.env.PORT,
    dbConnection: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
    }
}