import {Sequelize} from 'sequelize'
import sequelizeInstance from '../config'
import Post from "./Post";
import User from "./User";
import Comment from "./Comment";

const sequelize: Sequelize = sequelizeInstance;

const models = {
    Post,
    User,
    Comment
};

Object.values(models)
    .filter((model: any) => typeof model.associate === "function")
    .forEach((model: any) => model.associate(models));

const db = {
    ...models,
    sequelize
};


export default db;
