import { useContext } from "react";
import GlobalContext from "../GlobalContext/GlobalContext";

export default function ToDoListing() {
  
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="mb-3">ToDo List</h4>
        </div>
        <div className="card-body">
          <div className="row" id="productListing">
            
          </div>
        </div>
      </div>
    </>
  );
}
