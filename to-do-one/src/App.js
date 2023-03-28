import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
//import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

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
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateData && updateData.title}
                onChange={e => changeTask(e)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button
                onClick={updateTask}
                className="btn btn-lg btn-success mr-20">
                Update
              </button>
              <button onClick={cancelUpdate} className="btn btn-lg btn-warning">
                Cancel
              </button>
              <br></br>
            </div>
          </div>
          <br></br>
        </>
      ) : (
        <>
          {/* Add Task */}
          <div className="row">
            <div className="col">
              <input
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button
                onClick={addTask}
                className="btn btn-lg btn-success mr-20">
                Add Task
              </button>
              <br></br>
            </div>
          </div>
          <br></br>
        </>
      )}
      {/* Display ToDos*/}
      {toDo && toDo.length ? "" : "No Tasks..."}
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1)) //in case the elements are out of order
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.status ? "done" : ""}>
                    <span className="taskNumber">{index + 1}</span>
                    <span className="taskText">{task.title}</span>

                    <div className="iconsWrap">
                      <span
                        title="Completed / No Completed"
                        onClick={e => markDone(task.id)}>
                        <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
                      </span>
                      {task.status ? null : (
                        <span
                          title="Edit"
                          onClick={() =>
                            setUpdateData({
                              id: task.id,
                              title: task.title,
                              status: task.status ? true : false,
                            })
                          }>
                          <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                        </span>
                      )}

                      <span title="Delete" onClick={() => deleteTask(task.id)}>
                        <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                      </span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default App;
