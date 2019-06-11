import {GraphQLResolveInfo} from "graphql";
import {handleError, throwError} from "../../../utils/utils";
import {Transaction} from "sequelize";
import Post from "../../../models/Post";


export const postResolvers = {

    Post: {
        author: (post, args, {db}, info: GraphQLResolveInfo) => {
            return db.User
                .findByPk(post.get('author'))
                .catch(handleError);
        },

        comments: (post, {first = 10, offset = 0}, {db}, info: GraphQLResolveInfo) => {
            return db.Comment
                .findAll({
                    where: {post: post.get('id')},
                    limit: first,
                    offset: offset,
                })
                .catch(handleError);
        }

    },

    Query: {
        posts: (parent, {first = 10, offset = 0}, {db}, info: GraphQLResolveInfo) => {
            return db.Post
                .findAll({
                    limit: first,
                    offset: offset,
                }).catch(handleError);
        },

        post: (parent, {id}, {db}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.Post
                .findByPk(id)
                .then((post: Post) => {
                    throwError(!post, `Post with id ${id} not found!`);
                    return post;
                }).catch(handleError);
        }

    },

    Mutation: {
        createPost: (parent, {input}, {db}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .create(input, {transaction: t});
            }).catch(handleError);
        },

        updatePost: (parent, {id, input}, {db}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findByPk(id)
                    .then((post: Post) => {
                        throwError(!post, `Post with id ${id} not found!`);
                        input.author = id;
                        return post.update(input, {transaction: t});
                    });
            }).catch(handleError);
        },

        deletePost: (parent, {id}, {db}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findByPk(id)
                    .then((post) => {
                        throwError(!post, `Post with id ${id} not found!`);
                        return post.destroy({transaction: t})
                            .then(post => !!post);
                    });
            }).catch(handleError);
        }

    }

};
