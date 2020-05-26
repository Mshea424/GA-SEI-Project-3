const mongoose = require('./connection.js')

const PostSchema = new mongoose.Schema({
    user: String,
    body: String,
    date: String,
})

const PostModel = mongoose.model('Post', PostSchema)

function getAllPosts() {
    return PostModel.find({})
}

function getPostById(PostId) {
    return PostModel.findById(PostId)
}

function createPost(PostData) {
    return PostModel.create(PostData)
}

function updatePost(PostId, PostData) {
    return PostModel.findByIdAndUpdate(PostId, PostData)
}

function deletePost(PostId) {
    return PostModel.findByIdAndDelete(PostId)
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}