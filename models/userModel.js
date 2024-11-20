const mongoose = require('mongoose')

const user_details = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    mobile: {
        type: Number,
        require: true,
    }
})

module.exports = mongoose.model('User', user_details)