import {BaseModalInterface} from "../interfaces/BaseModalInterface";
import * as Sequelize from 'sequelize'

export interface UserAttributes {
    id?: number;
    name?: string,
    email?: string
    password?: string,
    photo?: string
}

export interface UserInstance extends  UserAttributes {
    isPassword(encodedPassword: string, password: string): boolean;

}

export interface UserModel extends BaseModalInterface, Sequelize.Model<UserInstance, UserAttributes> {

}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {
    const User: UserModel = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    });

    return User;
}