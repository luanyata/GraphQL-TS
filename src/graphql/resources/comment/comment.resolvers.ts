import {GraphQLResolveInfo} from "graphql";
import {Transaction} from "sequelize";
import {handleError, throwError} from "../../../utils/utils";
import Comment from "../../../models/Comment";

export const commentResolvers = {

    Comment: {
        user: (comment, args, {db}, info: GraphQLResolveInfo) => {
            return db.User
                .findByPk(comment.get('user'))
                .catch(handleError);
        },

        post: (comment, args, {db}, info: GraphQLResolveInfo) => {
            return db.Post
                .findByPk(comment.get('id'))
                .catch(handleError);
        }

    },

    Query: {
        commentsByPost: (parent, {postId, first = 10, offset = 0}, {db}, info: GraphQLResolveInfo) => {
            postId = parseInt(postId);
            return db.Comment
                .findAll({
                    where: {post: postId},
                    limit: first,
                    offset: offset,
                })
                .catch(handleError);
        }
    },

    Mutation: {
        createComment: (parent, {input}, {db}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .create(input, {transaction: t});
            }).catch(handleError);
        },

        updateComment: (parent, {id, input}, {db}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findByPk(id)
                    .then((comment: Comment) => {
                        throwError(!comment, `Comment with id ${id} not found!`);
                        return comment.update(input, {transaction: t});
                    });
            }).catch(handleError);
        },

        deleteComment: (parent, {id}, {db}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findByPk(id)
                    .then((comment) => {
                        throwError(!comment, `Comment with id ${id} not found!`);
                        return comment.destroy({transaction: t})
                            .then(comment => !!comment);
                    });
            }).catch(handleError);
        }
    }
};
