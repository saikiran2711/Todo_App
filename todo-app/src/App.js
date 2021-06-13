import Home from "./components/home";
import NavBar from "./components/navbar";
import Login from "./components/login";
import Register from "./components/register";
import NotFound from "./components/notfound";
import AddTodo from "./components/addtodo";
import Logout from "./components/logout";
import React from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="container-full width h-100">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/home">
            <NavBar />
            <Home />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/logout">
            <Logout />
          </Route>

          <Route exact path="/addtodo">
            <NavBar />
            <AddTodo />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
