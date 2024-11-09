import { useContext } from "react";
import GlobalContext from "../GlobalContext/GlobalContext";
import ToDo from "./ToDo";

export default function ToDoListing() {
  const { toDos } = useContext(GlobalContext);
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="mb-3">ToDo List</h4>
        </div>
        <div className="card-body">
          <div className="row" id="toDoListing">
            {toDos?.map((todo, index) => (
              <ToDo
                key={index}
                title={todo.title}
                desc={todo.description}
                completed={todo.classNameÌcompleted}
                id={todo.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
