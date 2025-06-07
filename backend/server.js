const express = require('express')
const mongoose = require('mongoose')
const Task = require('./model/taskModel')
const dotenv = require('dotenv').config()
const taskRoutes = require("./routes/taskRoute")
const cors = require('cors')

const app = express()

const MONGO_URI = process.env.MONGO_URI 
const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use("/api/tasks", taskRoutes)
app.use(cors({
    origin: "http://localhost:3000", // Adjust this to your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))

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
