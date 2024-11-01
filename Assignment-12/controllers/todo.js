import ToDo from "../modals/todo.js";

async function create(req, res) {
  const { title, description, completed } = req.body;

  const existingTodo = await ToDo.exists({ title });

  if (existingTodo != null) {
    res.json({
      success: false,
      message: "ToDo already exists",
      data: existingTodo,
    });
  } else if (!title || !description) {
    res.json({
      success: false,
      message: "Failed to create ToDo title and description are required.",
    });
  } else {
    ToDo.create({ title, description, completed })
      .then((data) => {
        res.json({
          success: true,
          message: 'ToDo is created.',
          toDo: data,
        });
      })
      .catch((err) => {
        console.log("Error found during ToDo creation", err);
      });
  }
}

function getAllTodos(req, res) {
  ToDo.find()
    .then((data) => {
      res.json({
        success: true,
        toDo: data
      });
    })
    .catch((err) => {
      console.log("Error found during ToDo fetch", err);
    });
}

function update(req, res) {
  const {id, title, description, completed } = req.body;

  ToDo.findByIdAndUpdate(id, { title, description, completed })
    .then((data) => {
      res.json({
        success: true,
        message: 'ToDo is Updated',
        toDo: data
      });
    })
    .catch((err) => {
      console.log("Error found during ToDo creation", err);
    });
}

async function deleteTodo(req, res) {
  const {_id} = req.params;
  const existingTodo = await ToDo.exists({ _id });

  if (existingTodo == null) {
    res.json({
      success: false,
      message: "ToDo does not exist"
    });
  } else {
    ToDo.findByIdAndDelete(_id)
    .then((data) => {
      res.json({
        success: true,
        message: `ToDo is deleted Id: ${_id}`
      });
    })
    .catch((err) => {
      console.log("Error found during ToDo deletion", err);
    });
  }
}

export { create, getAllTodos, update, deleteTodo };
