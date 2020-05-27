const mongoose = require('mongoose')

const connectionStr = process.env.MONGODB_URI || 'mongodb://localhost/sei-p-3'

mongoose.connect(connectionStr)
    .then(() => {
        console.log("Connected to Mongoose Successfully")
    })
    .catch((err) => {
        console.log("Failed to connect to Mongoose")
    })

module.exports = mongoose