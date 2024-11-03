import ToDo from "../modals/todo.js";

async function create(req, res) {
  const { title, description, completed } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Failed to create ToDo title and description are required.",
    });
  } 

  const existingTodo = await ToDo.exists({ title });

  if (existingTodo != null) {
    res.status(400).json({
      success: false,
      message: "ToDo already exists",
      data: existingTodo,
    });
  } else {
    ToDo.create({ title, description, completed })
      .then((data) => {
        res.status(200).json({
          success: true,
          message: "ToDo is created.",
          toDo: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: "Error found during User creation",
          User: err,
        });
      });
  }
}

function getAllTodos(req, res) {
  ToDo.find()
    .then((data) => {
      res.status(200).json({
        success: true,
        toDo: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Error found during User creation",
        User: err,
      });
    });
}

async function update(req, res) {
  const { id, title, description, completed } = req.body;

  const existingTodo = await ToDo.exists({ title, _id: { $ne: id } });

  if (existingTodo != null) {
    res.status(400).json({
      success: false,
      message: "This title is already used. "
    });
  } else {
    ToDo.findByIdAndUpdate(id, { title, description, completed })
      .then((data) => {
        res.status(200).json({
          success: true,
          message: "ToDo is Updated",
          toDo: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: "Error found during User creation",
          User: err,
        });
      });
  }
}

async function deleteTodo(req, res) {
  const { _id } = req.params;
  const existingTodo = await ToDo.exists({ _id });

  if (existingTodo == null) {
    res.status(400).json({
      success: false,
      message: "ToDo does not exist",
    });
  } else {
    ToDo.findByIdAndDelete(_id)
      .then((data) => {
        res.status(200).json({
          success: true,
          message: `ToDo is deleted Id: ${_id}`,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: "Error found during User creation",
          User: err,
        });
      });
  }
}

export { create, getAllTodos, update, deleteTodo };
