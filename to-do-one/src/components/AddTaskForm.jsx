const AddTaskFrom = ({ newTask, setNewTask, addTask }) => {
  return (
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
          <button onClick={addTask} className="btn btn-lg btn-success mr-20">
            Add Task
          </button>
          <br></br>
        </div>
      </div>
      <br></br>
    </>
  );
};

export default AddTaskFrom;
