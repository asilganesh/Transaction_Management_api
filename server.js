const express = require('express')
require('dotenv').config()
const connectDb = require("./config/db");
const transactionRoutes = require('./routes/transactionDetailsRoutes')

const app = express()

//middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb()

app.use(transactionRoutes)

app.listen(process.env.PORT, ()=>{
    console.log("server is running")
})