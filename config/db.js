const mongoose = require('mongoose')
require('dotenv').config()


const connectDB = async() => {

    try{
        const mongoDbUri = process.env.MONGODB_URI
        const connect = await mongoose.connect(mongoDbUri,{ serverSelectionTimeoutMS: 20000,})
        console.log(`MongoDB Connected: ${connect.connection.host}`)
    }
    catch(err) {
        console.log(`Error : ${err.message}`)
        console.log(`Error : ${err.cause}`)
    }
}

module.exports = connectDB