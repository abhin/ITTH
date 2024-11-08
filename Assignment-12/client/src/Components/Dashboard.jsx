import { useContext } from "react";
import AddToDo from "./AddToDo";
import ToDoListing from "./ToDoListing";
import GlobalContext from "../GlobalContext/GlobalContext";

export default function Dashboard() {
  return (
    <div className="row">
      <div className="col-md-4">
        <AddToDo />
      </div>
      <div className="col-md-8">
        <ToDoListing />
      </div>
    </div>
  );
}
