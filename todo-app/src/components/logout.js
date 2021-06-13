import React, { useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  useEffect(() => {
    fetch("/api/logout", {
      method: "POST",
    }).then((res) => {
      if (res.status == 201) {
        console.log("In logout function");
        history.push("/");
      }
    });
  }, []);

  return (
    <div className="container h-100 col-lg-6">
      <div className="row justify-content-center align-items-center h-100 w-100">
        <div className="w-100 text-center">
          <h3>You have been logged out successfully!</h3>
          <center>
            <NavLink className="btn btn-primary" to="/">
              Login Here
            </NavLink>
          </center>
        </div>
      </div>
    </div>
  );
}
