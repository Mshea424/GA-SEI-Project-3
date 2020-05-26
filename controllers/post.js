const express = require('express')
const postModel = require('../models/post.js')
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();
const postRouter = express.Router()

// const text = 'The text to translate, e.g. Hello, world!';
const target = 'ru';

async function translateText(text, target) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('Translations:');
    return translations[0]
}

//  translateText('Hello, friend. My name is Mike', 'ru');


let translatePost = async (reqBody) => {
    let translatedPost = {
        date: reqBody.date,
        user: reqBody.user
    }
    translatedOne = await translateText(reqBody.body, 'ru')
    translatedTwo = await translateText(translatedOne, 'af')
    translatedThree = await translateText(translatedTwo, 'zh')
    translatedFour = await translateText(translatedThree, 'is')
    translatedFive = await translateText(translatedFour, 'iw')
    translatedSix = await translateText(translatedFive, 'hi')
    translatedSeven = await translateText(translatedSix, 'sw')
    translatedEight = await translateText(translatedSeven, 'haw')
    translatedDone = await translateText(translatedEight, 'en')
    // translatedDone = await translateText(translatedThree, 'en')
    translatedPost.body = translatedDone
    return translatedPost
}

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
        let translatedPost = await translatePost(req.body)
        await postModel.createPost(translatedPost)
        res.json('ok')
    } catch (error) {
        res.status(500).json(error)
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