const mongoose = require('./connection.js')

const CommentSchema = new mongoose.Schema({
    user: String,
    postId: String,
    body: String,
    date: String
})

const CommentModel = mongoose.model('Comment', CommentSchema)

function getAllComments() {
    return CommentModel.find({})
}

function getCommentById(CommentId) {
    return CommentModel.findById(CommentId)
}

function createComment(CommentData) {
    return CommentModel.create(CommentData)
}

function updateComment(CommentId, CommentData) {
    return CommentModel.findByIdAndUpdate(CommentId, CommentData)
}

function deleteComment(CommentId) {
    return CommentModel.findByIdAndDelete(CommentId)
}


module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}