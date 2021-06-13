import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const history = useHistory();
  const [message, setmessage] = useState("");
  let mes;

  if (message != "") {
    mes = (
      <div class="alert alert-danger" role="alert">
        {message}
      </div>
    );
  } else {
    mes = <div></div>;
  }

  const handleInputs = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const postData = async (e) => {
    console.log("Inside postData");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    console.log("after fetch");
    const resp = await res.json();

    // window.alert(resp.message)
    if (res.status === 422) {
      setmessage(resp.message);
    } else if (res.status === 201) {
      history.replace("/home");
    }
  };

  return (
    <div className="container-fluid h-100 pl-xs-5 pl-sm-5">
      <div
        className="row justify-content-center ml-lg-5 align-items-center h-100 w-lg-100 w-sm-100 "
        style={{ margin: 0 }}
      >
        <div
          className="col z-depth-3 card col-sm-6 col-xs-12 col-lg-6 col-xl-4 border p-4"
          style={{
            backgroundColor: "white",

            borderRadius: "5%",
          }}
        >
          {mes}
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <legend>
              <center>Login</center>
            </legend>
            <hr />
            <div className="md-form mt-5">
              <i class="fas fa-envelope prefix"></i>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => handleInputs(e)}
                className="form-control"
                id="exampleInputEmail1"
              />
              <label for="exampleInputEmail1">E-mail address</label>
            </div>
            <div class="md-form">
              <i class="fas fa-lock prefix"></i>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => handleInputs(e)}
                id="form4"
                class="form-control"
              />
              <label for="form4">Your password</label>
            </div>

            <input
              type="submit"
              onClick={(e) => postData(e)}
              name="submit"
              className="btn btn-deep-orange"
              value="Submit"
            />
          </form>

          <div className="row mx-1 my-3">
            <h5 className="mx-1" style={{ display: "inline" }}>
              Don't have an account ?{" "}
            </h5>
            <NavLink
              className="text-grey"
              to="/register"
              style={{ color: "orange" }}
            >
              {" "}
              SignUp
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
