import React from "react";
import { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    email: "",
    password1: "",
    password2: "",
    username: "",
  });
  const history = useHistory();
  const [message, setmessage] = useState("");
  let mes;

  if (message != "") {
    mes = (
      <div class="alert alert-danger " role="alert">
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
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password1: data.password1,
        password2: data.password2,
      }),
    });

    const resp = await res.json();
    if (res.status === 422) {
      setmessage(resp.message);
    } else if (res.status == 401) {
      setmessage(resp.message);
    } else if (res.status === 201) {
      history.push("/");
    }
  };

  return (
    <div className="container-fluid h-100 pl-xs-5 pl-sm-5 ">
      <div
        className="row justify-content-center m-sm-5 align-items-center h-100 w-sm-100 w-lg-100 "
        style={{ margin: 0 }}
      >
        <div
          className="col z-depth-3 card col-sm-8 col-xs-8 col-lg-8 col-xl-4 border p-3 mx-sm-5 "
          style={{
            backgroundColor: "white",

            borderRadius: "5%",
          }}
        >
          <br />
          {mes}
          <form
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <legend>
              <center>Register</center>
            </legend>
            <hr />

            <div class="md-form mt-5">
              <i class="fas fa-user prefix"></i>
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={(e) => handleInputs(e)}
                id="inputIconEx2"
                class="form-control"
              />
              <label for="inputIconEx2">Enter username</label>
            </div>
            <div className="md-form ">
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
                name="password1"
                value={data.password1}
                onChange={(e) => handleInputs(e)}
                id="form4"
                class="form-control"
              />
              <label for="form4">Enter password</label>
            </div>

            <div class="md-form">
              <i class="fas fa-lock prefix"></i>
              <input
                type="password"
                name="password2"
                value={data.password2}
                onChange={(e) => handleInputs(e)}
                id="form5"
                class="form-control"
              />
              <label for="form5">Enter password again</label>
            </div>

            <input
              type="submit"
              onClick={(e) => postData(e)}
              name="submit"
              className="btn btn-blue-grey"
              value="Submit"
            />
          </form>
          <div className="row mx-1 my-3">
            <h5 className="mx-1" style={{ display: "inline" }}>
              Already have an account ?{" "}
            </h5>
            <NavLink className="text-grey" to="/" style={{ color: "black" }}>
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
