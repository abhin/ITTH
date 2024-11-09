import { useContext, useState } from "react";
import GlobalContext from "../GlobalContext/GlobalContext";

export default function AddTodo() {
  const { addTodo} = useContext(GlobalContext);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4>Add Todo</h4>
        </div>
        <div className="card-body">
          <form
            id="todoForm"
            onSubmit={(e) => {
              e.preventDefault();
              addTodo(title, desc);
            }}
          >
            <div className="mb-3">
              <label htmlFor="todoName" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                required
                onChange={(e) => { setTitle(e.currentTarget.value) }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="todoPrice" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                placeholder="Enter description"
                onChange={(e) => { setDesc(e.currentTarget.value) }}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Todo
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
