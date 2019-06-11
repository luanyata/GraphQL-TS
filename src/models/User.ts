import {CreateOptions, DataTypes, InstanceUpdateOptions, Model} from "sequelize";
import {compareSync, genSaltSync, hashSync} from "bcryptjs";
import sequelize from "../config";

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public photo!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public isPassword(encodedPassword: string, password: string): boolean {
        return compareSync(password, encodedPassword)
    };
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    photo: {
        type: DataTypes.BLOB({
            length: 'long'
        }),
        allowNull: true,
        defaultValue: null
    }
}, {
    tableName: 'users',
    sequelize,
    hooks: {
        beforeCreate(user: User, options: CreateOptions): Promise<void> | void {
            const salt = genSaltSync();
            user.password = hashSync(user.password, salt)
        },
        beforeUpdate(user: User, options: InstanceUpdateOptions): Promise<void> | void {
            if (user.changed('password')) {
                const salt = genSaltSync();
                user.password = hashSync(user.password, salt);
            }
        }
    }
});


export default User;
