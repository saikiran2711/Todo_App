const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UserModel = require("../models/usermodel");

const jwt = require("jsonwebtoken");
require("../models/todomodel");
const TodoModel = mongoose.model("todos");
const TodoItemSchema = mongoose.model("todoItems");

const SECRET_KEY =
  "n2r5u8x/A?D(G+KbPeShVkYp3s6v9y$B&E)H@McQfTjWnZq4t7w!z%C*F-JaNdRg";

const verifyCookie = async (req, res, next) => {
  try {
    console.log("Inside verify cookie");
    const token = req.cookies.token;

    const verify = jwt.verify(token, SECRET_KEY);
    console.log("Cokkie verified");
    console.log(verify._id);

    const user = await UserModel.findOne({ _id: verify._id, token: token });
    if (!user) {
      console.log("user not found");
      throw error("User not found");
    }
    req.body.id = user._id;
    next();
  } catch (err) {
    console.log("got eerror");
    return res.status(401).json({ message: "You are unauthorised !" });
  }
};

router.post("/api/todo", verifyCookie, async (req, res) => {
  var data;
  const { title, description } = req.body;

  let date_obj = new Date();
  let date = date_obj.getDate().toString();
  let month = date_obj.getMonth().toString();
  let year = date_obj.getFullYear().toString();
  let hour = date_obj.getHours().toString();
  let minutes = date_obj.getMinutes().toString();

  const todoItem = new TodoItemSchema({
    title: title,
    description: description,
    createdAt: date + "/" + month + "/" + year + " " + hour + ":" + minutes,
  });
  try {
    const user = await TodoModel.findOne({ uid: req.body.id });

    if (!user) {
      const todo = new TodoModel({
        uid: req.body.id,
        todoItems: [todoItem],
      });
      data = await todo.save();
    } else {
      user.todoItems.push(todoItem);
      data = await user.save();
    }
    console.log(data);
    return res.status(201).json({ message: "Done" });
  } catch (err) {
    return res.status(422).json({ message: "Please try again" });
  }
});

router.get("/api/verify", verifyCookie, (req, res) => {
  res.status(201).json({ message: "valid user" });
});

router.get("/api/todos", verifyCookie, async (req, res) => {
  try {
    const user = await TodoModel.findOne({ uid: req.body.id });
    const todos = user.todoItems;
    console.log("Got data");
    console.log(todos);
    return res.status(201).json(todos);
  } catch {
    console.log("caught error");
    return res.status(201).json([]);
  }
});

router.post("/api/delete-todo/:id", verifyCookie, async (req, res) => {
  try {
    const { id } = req.params;
    await TodoModel.updateOne(
      { uid: req.body.id },
      { $pull: { todoItems: { _id: id } } },
      { multi: true }
    );
    res.status(201).json({ message: "Done" });
  } catch (error) {
    res.status(401).send("Please try again");
  }
});

module.exports = router;
