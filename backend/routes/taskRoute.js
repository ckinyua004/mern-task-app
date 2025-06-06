const express = require('express')
const Task = require('../model/taskModel')
const { createTask, getTasks, getTask, deleteTask, updateTask } = require('../controllers/taskController')
const router = express.Router()

router.post("/", createTask)//Creating a task
router.get("/", getTasks)//Getting tasks
router.get("/:id", getTask)//Getting a single task by id
router.delete("/:id", deleteTask)//Deleting a task by id
router.put("/:id", updateTask)//Updating a task by id

// router.route("/:id")
//     .get(getTask) // Get a single task by id
//     .delete(deleteTask) // Delete a task by id
//     .put(updateTask) // Update a task by id

// router.route("/")
//     .post(createTask) // Create a new task
//     .get(getTasks) // Get all tasks

module.exports = router