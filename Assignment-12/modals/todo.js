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

const ToDo = mongoose.model('ToDos', ToDoSchema);

export default ToDo;
