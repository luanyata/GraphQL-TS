import {Sequelize} from "sequelize";

const config = {
    "username": "root",
    "password": 'Ly@ta!23',
    "database": "graphql_blog_development",
    "host": "127.0.0.1",
};

const sequelizeInstance: Sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: "mysql",
        logging: log => console.log(log),

    },
);

export default sequelizeInstance;
