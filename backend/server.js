const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const app = express()

const MONGO_URI = process.env.MONGO_URI 
const PORT = process.env.PORT || 5000

mongoose
    .connect(MONGO_URI, {})
    .then(() => {
        console.log("Connected to MongoDB")

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err)
        process.exit(1)
    })

app.get("/", (req, res) => {
    res.send("Home page. Welcome to the MERN Task Manager!")
})

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${ PORT }`)
// })