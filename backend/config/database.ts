import {Sequelize} from 'sequelize';

console.log('DB_NAME: ', process.env.DB_NAME);
console.log('DB_USER: ', process.env.DB_USER);
console.log('DB_HOST: ', process.env.DB_HOST);

export const sequelize: Sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false, // set to console.log to see the raw SQL queries
    pool: {
        max: 5, // maximum number of connection in pool
        min: 0, // minimum number of connection in pool
        acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
    },
    define: {
        timestamps: false // true by default. false because default sequelize adds createdAt, modifiedAt
    }
});