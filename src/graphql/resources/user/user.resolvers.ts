import {GraphQLResolveInfo} from "graphql";
import User from "../../../models/User";
import {handleError, throwError} from "../../../utils/utils";
import {Transaction} from "sequelize";

export const userResolvers = {

    User: {
        posts: (user: User, {first = 10, offset = 0}, {db}, info: GraphQLResolveInfo) => {
            return db.Post
                .findAll({
                    where: {author: user.get('id')},
                    limit: first,
                    offset: offset
                }).catch(handleError);
        }
    },

    Query: {
        users: (parent, {first = 10, offset = 0}, {db}, info: GraphQLResolveInfo) => {
            return db.User
                .findAll({limit: first, offset})
                .catch(handleError);
        },

        user: (parent, {id}, {db}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.User
                .findByPk(id)
                .then((user: User) => {
                    if (!user) throw new Error(`User with id ${id} not found!`);

                    return user
                }).catch(handleError)
        }
    },


    Mutation: {
        createUser: (parent, {input}, {db}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .create(input, {transaction: t});
            }).catch(handleError);
        },

        updateUser: (parent, {id, input}, {db}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findByPk(id)
                    .then((user: User) => {
                        throwError(!user, `User with id ${id} not found!`);
                        return user.update(input, {transaction: t});
                    });
            }).catch(handleError);
        },

        updateUserPassword: (parent, {id, input}, {db}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findByPk(id)
                    .then((user: User) => {
                        throwError(!user, `User with id ${id} not found!`);
                        return user.update(input, {transaction: t})
                            .then((user: User) => !!user);
                    });
            }).catch(handleError);
        },

        deleteUser: (parent, {id, input}, {db}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findByPk(id)
                    .then((user) => {
                        throwError(!user, `User with id ${id} not found!`);
                        return user.destroy({transaction: t})
                            .then(user => !!user)
                    });
            }).catch(handleError);
        }

    }
};
