import mongoose from "mongoose";

const ToDoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: false,
  },
});

const ToDos = mongoose.model('ToDos', ToDoSchema);

async function create(req, res) {
  const { title, description, completed } = req.body;

  ToDos.create({ title, description, completed })
    .then((data) => {
      res.json({
        sucess: true,
        message: `ToDo is created Id: ${data._id}`,
      });
    })
    .catch((err) => {
      console.log("Error found during ToDo creation", err);
    });
}

export {create};

export default ToDos;
