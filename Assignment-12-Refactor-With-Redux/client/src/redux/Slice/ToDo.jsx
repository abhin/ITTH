import { createSlice } from "@reduxjs/toolkit";
import { showError, showSucess } from "../../Functions/Message";

const ToDo = createSlice({
  name: "ToDo",
  initialState: {
    user: {},
    toDos: [],
    title: "",
    description: "",
    id: "",
    completed: false,
  },
  reducers: {
    addTodo: (state) => {
      const { title, description, toDos, user } = state;
      fetch("http://localhost:8000/api/v1/todos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data?.success) {
            showError(data.message);
            return;
          } else {
            state.toDos = [data.toDo, ...toDos];
            showSucess(data.message);
          }
        })
        .catch((err) => {
          showError(err.message);
        });
    },

    getAllToDo: (state) => {
      const { user } = state;
      fetch("http://localhost:8000/api/v1/todos/read", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data?.success) {
            showError(data.message);
            return;
          } else {
            state.toDos = data.toDo;
          }
        })
        .catch((err) => {
          showError(err.message);
        });
    },

    updateToDo: (state) => {
      const { user, id, completed, getAllToDo } = state;
      fetch("http://localhost:8000/api/v1/todos/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token,
        },
        body: JSON.stringify({ id, completed }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          if (!data?.success) {
            showError(data.message);
          } else {
            getAllToDo();
            showSucess(data.message);
          }
        })
        .catch((err) => {
          showError(err.message);
        });
    },

    deleteToDo: (state) => {
      const { user, id, getAllToDo } = state;
      fetch(`http://localhost:8000/api/v1/todos/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: user?.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data?.success) {
            showError(data.message);
            return;
          } else {
            getAllToDo();
            showSucess(data.message);
          }
        })
        .catch((err) => {
          showError(err.message);
        });
    },
  },
});

export default ToDo.reducer;
