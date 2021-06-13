const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Clashcode:clash@123@cluster0.oi2jo.mongodb.net/todo_db?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("mangodb connected successfully");
    } else {
      console.log(err);
    }
  }
);

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

module.exports = new mongoose.model("users", UserSchema);
