import React, { useEffect } from 'react';
import TaskForm from './TaskForm';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import Task from './Task';
import { url } from '../App';
import loader from '../assets/loader.gif';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formdata, setFormData] = React.useState({
        name: '',
        completed: false,
    });
    const { name, completed } = formdata;
    const {TaskID, setTaskID} = useState("")
    const {isEditing, setIsEditing} = useState(false)

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formdata,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    const getTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/api/tasks`);
            setTasks(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch tasks');
            setLoading(false);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const createTask = async(e) => {
        e.preventDefault();
        if (!name) {
            return toast.error('Please add a task');
        } else {
            // Here you would typically send the task to your backend
            console.log('Task created:', { name, completed });
            setFormData({ name: '', completed: false }); // Reset form
        }
        try {
            await axios.post(`${url}/api/tasks`, formdata);
            setFormData({ ...formdata, name: '' }); 
            toast.success('Task created successfully');
        } catch (error) {
            console.error('Error creating task:', error);
            toast.error(error.response?.data?.message || 'Failed to create task');
        }
    }

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${url}/api/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
            toast.success('Task deleted successfully');
            getTasks(); // Refresh the task list
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error(error.response?.data?.message || 'Failed to delete task');
        }
    }

    useEffect(() => {
        const cTask = tasks.filter((task) => {
            return task.completed === true
        })
        setCompletedTasks(cTask)
    }, [tasks])

    const getSingleTask = async (task) => {
        setFormData({
            name: task.name,
            completed: false
        });
        setTaskID(task._id)
        setIsEditing(true)
        try {
            const response = await axios.get(`${url}/api/tasks/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching task:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch task');
        }
    }

    const updateTask = async (e) => {
        e.preventDefault()
        if(name === "") {
            return toast.error("Input field cannot be empty.")
        }
        try {
            await axios.put(`${url}/api/tasks/${TaskID}`, formdata)
            setFormData({...formdata, name:""})
            setIsEditing(false)
            getTasks()
        } catch(error){
            toast.error(error.message)
        }
    }

    const setToComplete = async (task) => {
        const newFormData = {
            name: task.name,
            completed: true,
        }
        try {
            await axios.put(`${url}/api/tasks/${task._id}`, newFormData)
            getTasks()
        } catch(error) {
            toastify.error(error.message)
        }
    }

    return (
        <div>
            <h4>TaskList</h4>
            <TaskForm 
                name={name} 
                createTask={createTask} 
                handleInputChange={handleInputChange} 
                isEditing={isEditing} 
                updateTask="updateTask"
            />
            {tasks.length > 0 && (
            <div className="--flex-between --pb">
                <p>
                    <b>Total Tasks: </b> {tasks.length}
                </p>
                <p>
                    <b>Completed Tasks: </b> {completedTasks.length}
                </p>
            </div>
            )}
            <hr />
            {
                loading && (
                    <div className='--flex-center'>
                        <img src={loader} alt="Loading..." />
                    </div>
                )
            }
            {tasks.length === 0 && !loading ? (
                <p className='--py'>No tasks found</p>
            ) : (
                <div className="task-list">
                    {tasks.map((task) => (
                        <Task 
                            key={task._id} 
                            task={task} 
                            getTasks={getTasks} 
                            setCompletedTasks={setCompletedTasks} 
                            getsingleTask={getSingleTask}
                            setToComplete={setToComplete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;