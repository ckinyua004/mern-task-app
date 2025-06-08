import React from 'react'

const TaskForm = ({createTask, name, handleInputChange, isEditing, updateTask}) => {
  return (
    <form className='task-form' onSubmit={isEditing ? updateTask : createTask}>
        <input type="text" placeholder='Add Task' name='name' value={name} className='task-input' onChange={handleInputChange}/>
        <button type='submit' className='task-button'>{isEditing ? "Edit" : "Add"}</button>
    </form>
  )
}

export default TaskForm