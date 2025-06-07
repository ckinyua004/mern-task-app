import {FaEdit, FaCheckDouble, FaRegTrashAlt} from 'react-icons/fa';

const Task = () => {
  return (
    <div className='task'>
        <h2>TaskForm</h2>
        <div className='task-icons'>
            <FaCheckDouble color='green'/>
            <Faedit color='purple'/>
            <FaRegTrashAlt color='red'/>
        </div>
    </div>
  )
}

export default Task