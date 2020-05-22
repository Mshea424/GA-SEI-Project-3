const express = require('express')
const commentModel = require('../models/comment.js')
const postModel = require('../models/post.js')

const commentRouter = express.Router()


// GET ALL
commentRouter.get('/', async (req, res) => {
    try {
        const allComments = await commentModel.getAllComments()
        res.json(allComments)
    } catch (error) {
        res.statusCode(500).json(error)
        console.log(error)
    }
})

// GET ONE
commentRouter.get('/:commentId', async (req, res) => {
    try {
        const comment = await commentModel.getCommentById(req.params.commentId)
        const post = await postModel.getPostById(comment.postId)
        res.json(comment, post)
    } catch (error) {
        res.statusCode(500).json(error)
        console.log(error)
    }
})

// CREATE
commentRouter.comment('/', async (req, res) => {
    try {
        await commentModel.createComment(req.body)
        res.json('ok')
    } catch (error) {
        res.statusCode(500).json(error)
        console.log(error)
    }
})

// UPDATE
commentRouter.put('/:commentId', async (req, res) => {
    try {
        await commentModel.updateComment(req.params.commentId, req.body)
        res.json("ok")
    } catch (error) {
        res.statusCode(500).json(error)
        console.log(error)
    }
})


// DELETE
commentRouter.delete('/:commentId', async (req, res) => {
    try {
        await commentModel.deleteComment(req.params.commentId)
        res.json("ok")
    } catch (error) {
        res.statusCode(500).json(error)
        console.log(error)
    }
})


module.exports = commentRouter