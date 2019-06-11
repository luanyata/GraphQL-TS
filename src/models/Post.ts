import {Association, DataTypes, Model} from "sequelize";
import sequelize from "../config";
import User from "./User";

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public photo!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

    public readonly author: User;

    public static associate: {
        user: Association<Post, User>
    };
}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    photo: {
        type: DataTypes.BLOB({
            length: 'long'
        }),
        allowNull: false
    }
}, {tableName: 'posts', sequelize: sequelize});

Post.belongsTo(User, {
    foreignKey: {
        allowNull: false,
        field: 'author',
        name: 'author'
    }
});

export default Post
