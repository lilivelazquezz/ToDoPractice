import { useState } from "react";
import AddTaskFrom from "./components/AddTaskForm.jsx";
import UpdateForm from "./components/UpdateForm.jsx";
import ToDo from "./components/ToDo.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([
    // { id: 1, title: "Task 1", status: true } original record to build the app
  ]);

  //Temp State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  //Add task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = {
        id: num,
        title: newTask,
        status: false,
      };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  // Delete Task
  const deleteTask = id => {
    let newTasks = toDo.filter(task => task.id !== id);
    setToDo(newTasks);
  };

  // Mark task as done or complete
  const markDone = id => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  // Cancel update
  const cancelUpdate = () => {
    setUpdateData("");
  };

  // Change task for update
  const changeTask = e => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  // Update task
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updateObject = [...filterRecords, updateData];
    setToDo(updateObject);
    setUpdateData("");
  };

  return (
    <div className="container App">
      <br></br>
      <h2>To Do List(ReactJS)</h2>
      <br></br>
      {/* Update Task */}
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskFrom
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}
      {/* Display ToDos*/}
      {toDo && toDo.length ? "" : "No Tasks..."}
      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
