import React from 'react';
import TaskForm from './TaskForm';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import Task from './Task'; // Assuming Task component is in the same directory

const TaskList = () => {
    const [formdata, setFormData] = React.useState({
        name: '',
        completed: false,
    });
    const { name, completed } = formdata;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formdata,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

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
            await axios.post('http://localhost:5000/api/tasks', formdata);
            setFormData({ ...formdata, name: '' }); 
            toast.success('Task created successfully');
        } catch (error) {
            console.error('Error creating task:', error);
            toast.error(error.response?.data?.message || 'Failed to create task');
        }
    }

    return (
        <div>
            <h4>TaskList</h4>
            <TaskForm name={handleInputChange} createTask={createTask}/>
            <div className="--flex-between --pb">
                <p>
                    <b>Total Tasks: </b> List
                </p>
                <p>
                    <b>Comleted Tasks: </b> List
                </p>
            </div>
            <hr />
            <Task />
        </div>
    );
};

export default TaskList;