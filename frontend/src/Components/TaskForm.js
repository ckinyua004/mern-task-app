import React from 'react'

const TaskForm = ({createTask, name, handleInputChange}) => {
  return (
    <form className='task-form' onSubmit={createTask}>
        <input type="text" placeholder='Add Task' name='name' value={name} className='task-input' onChange={handleInputChange}/>
        <button type='submit' className='task-button'>Add Task</button>
    </form>
  )
}

export default TaskForm