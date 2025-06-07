import TaskList from "./Components/TaskList";
import { ToastContainer, toast } from 'react-toastify'

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
