import {Association, DataTypes, Model} from "sequelize";
import Post from "./Post";
import User from "./User";
import sequelize from "../config";

class Comment extends Model {
    public id!: number;
    public comment!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public readonly user: User;
    public readonly posts: Post[];

    public static associate: {
        posts: Association<Comment, Post>
        user: Association<Comment, User>
    }

}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {modelName: 'comments', sequelize});


Comment.belongsTo(Post, {
    foreignKey: {
        allowNull: false,
        field: 'post',
        name: 'post'
    }
});
Comment.belongsTo(User, {
    foreignKey: {
        allowNull: false,
        field: 'user',
        name: 'user'
    }
});

export default Comment
