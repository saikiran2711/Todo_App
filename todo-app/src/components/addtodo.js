import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function AddTodo() {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetch("/api/verify")
      .then((res) => {
        if (res.status == 201) {
          console.log("USer verified");
        } else if (res.status == 401) {
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const history = useHistory();

  const handleInputs = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const postData = async (e) => {
    console.log("Inside postData");
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
      }),
    });
    console.log("after fetch");
    if (res.status === 422) {
      window.alert("Invalid details");
    } else if (res.status === 201) {
      history.replace("/home");
      window.location.reload();
    }
  };
  return (
    <div className="container-fluid mt-5 p-5">
      <div className="row justify-content-center  align-items-center ">
        <div className="col col-sm-6 col-md-6 col-lg-6 col-xl-6 border p-4 br-10 rounded">
          <br />
          <form
            method="POST"
            enctype="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <legend>Add New Todo</legend>
            <hr />
            <div className="form-group">
              <label htmlFor="titleField">Title</label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={(e) => handleInputs(e)}
                className="form-control"
                id="usernameField"
                aria-describedby=""
                placeholder="Enter title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="descriptionField">Description</label>
              <input
                type="text"
                name="description"
                value={data.description}
                onChange={(e) => handleInputs(e)}
                className="form-control"
                id="descriptionField"
                aria-describedby=""
                placeholder="Enter description"
              />
            </div>
            <input
              type="submit"
              onClick={(e) => postData(e)}
              name="submit"
              className="btn btn-primary"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
