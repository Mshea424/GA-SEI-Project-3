const express = require('express')
const postModel = require('../models/post.js')

const postRouter = express.Router()


// GET ALL
postRouter.get('/', async (req, res) => {
    try {
        const allPosts = await postModel.getAllPosts()
        res.json(allPosts)
    } catch (error) {
        res.statusCode(500).json(error)
        console.log(error)
    }
})

// GET ONE
postRouter.get('/:postId', async (req, res) => {
    try {
        const post = await postModel.getPostById(req.params.postId)
        res.json(post)
    } catch (error) {
        res.statusCode(500).json(error)
        console.log(error)
    }
})

// CREATE
postRouter.post('/', async (req, res) => {
    try {
        await postModel.createPost(req.body)
        res.json('ok')
    } catch (error) {
        res.statusCode(500).json(error)
        console.log(error)
    }
})

// UPDATE
postRouter.put('/:postId', async (req, res) => {
    try {
        await postModel.updatePost(req.params.postId, req.body)
        res.json("ok")
    } catch (error) {
        res.statusCode(500).json(error)
        console.log(error)
    }
})


// DELETE
postRouter.delete('/:postId', async (req, res) => {
    try {
        await postModel.deletePost(req.params.postId)
        res.json("ok")
    } catch (error) {
        res.statusCode(500).json(error)
        console.log(error)
    }
})


module.exports = postRouter