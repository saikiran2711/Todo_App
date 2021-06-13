const mongoose = require("mongoose");

var TodoItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  status: {
    type: String,
    default: "Not Done",
  },
});

var TodosSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  todoItems: {
    type: [TodoItemSchema],
  },
});

module.exports = new mongoose.model("todoItems", TodoItemSchema);
module.exports = new mongoose.model("todos", TodosSchema);
