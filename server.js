const express = require('express')
const postRouter = require('./controllers/post.js')
const commentRouter = require('./controllers/comment.js')

const app = express()

app.use(express.json())

app.use(express.static(`${__dirname}/client/build`))

app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Application has started on port ${PORT}`)
})