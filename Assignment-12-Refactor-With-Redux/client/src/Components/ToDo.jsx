import { updateToDo, deleteToDo } from '../redux/Slice/toDoSlice'

export default function ToDo({ title, desc, completed, id }) {

  return (
    <>
      <div className="card" style={{ width: "100rem" }}>
        <div className="card-body">
          <h5 className="card-title d-inline m-2">{title}</h5>
          {completed == true ? (
            <span className="badge rounded-pill text-bg-success d-inline">
              Completed
            </span>
          ) : (
            <span className="badge rounded-pill text-bg-warning d-inline">
              Pending
            </span>
          )}
          <p className="card-text">{desc}</p>
          <button className="btn btn-danger" onClick={() => deleteToDo(id)}>
            Delete
          </button>
          {!completed && (
            <button
              className="btn btn-primary m-2"
              onClick={() => updateToDo(id, true)}
            >
              Mark as completed
            </button>
          )}
        </div>
      </div>
    </>
  );
}
