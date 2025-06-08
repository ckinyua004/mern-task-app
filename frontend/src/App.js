import TaskList from "./Components/TaskList";
import { ToastContainer, toast } from 'react-toastify';

export const url = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

function App() {
  return (
    <div className="App">
        <div className="task-container">
          <TaskList />
        </div>
        <ToastContainer />
    </div>
  );
}

export default App;
