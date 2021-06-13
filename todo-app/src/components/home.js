import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../components/loading";

function MediaCard(props) {
  const history = useHistory();

  const deleteTodo = (id) => {
    fetch(`/api/delete-todo/${id}`, {
      method: "POST",
    })
      .then((res) => {
        if (res.status == 201) {
          history.push("/home");
          window.location.reload();
        } else if (res.status == 401) {
          window.alert("Please try again");
        }
      })
      .catch((err) => {
        window.alert("Please try again");
      });
  };
  return (
    <div className="col-lg-12 col-md-12 mb-5  align-items-strech">
      <div className="card card_prod  ">
        <div className="card-body">
          <h2
            className="row mx-1 "
            style={{ textAlign: "left", alignContent: "space-between" }}
          >
            {props.data.title}
          </h2>
          <hr />
          <div className="row mx-1 p-1 ">
            <h6 style={{ textAlign: "left" }}>{props.data.description}</h6>
          </div>
        </div>
        <div className="row">
          <div
            className="col-lg-12 col-md-6 mb-2 justify-content-end"
            style={{ alignContent: "flex-end", flexDirection: "row" }}
          >
            <button
              onClick={() => {
                deleteTodo(props.data._id);
              }}
              style={{
                border: "none",
                backgroundColor: "white",
                color: "tomato",
                borderColor: "white",
              }}
            >
              <i class="fas fa-trash fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [todos, settodos] = useState();
  const history = useHistory();
  const [gotdata, setgotdata] = useState(false);

  useEffect(() => {
    fetch("/api/verify")
      .then((res) => {
        if (res.status == 201) {
          console.log("USer verified");
          fetch("/api/todos")
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              settodos(data);
              setgotdata(true);
            })
            .catch((err) => {});
        } else if (res.status == 401) {
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return !gotdata ? (
    <Loading />
  ) : todos.length == 0 ? (
    <div className=" h-100 mt-5">
      <div className="row justify-content-center align-items-center h-100">
        <h3>No Todo items added yet !!</h3>
      </div>
    </div>
  ) : (
    <div className="container mt-3 p-5">
      <center>
        <h2 className="my-3">Your Todo's</h2>
        <hr />
      </center>

      <section className="dark-grey-text text-center">
        <div className="row">
          {todos.map((data) => (
            <MediaCard data={data} key={data._id} />
          ))}
        </div>
      </section>
    </div>
  );
}
