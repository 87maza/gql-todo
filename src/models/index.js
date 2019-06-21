import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todoId: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  timestamps: true
});

const Todo = mongoose.model("todo", todoSchema);

export default Todo;
