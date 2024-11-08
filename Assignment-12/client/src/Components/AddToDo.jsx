import { useContext } from "react";
import GlobalContext from "../GlobalContext/GlobalContext";

export default function AddTodo() {
  const { handleSubmit} = useContext(GlobalContext);
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
              handleSubmit(e);
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
