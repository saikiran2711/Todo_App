import React from "react";

export default function NotFound() {
  return (
    <div className="container h-100 ">
      <div className="row mt-5 justiy-content-center align-items-center h-100 w-100">
        <div className=" py-5">
          <center>
            <div className="col-lg-6">
              <img
                src="./images/404.jpg"
                style={{ border: "none" }}
                className="img-thumbnail"
                alt="404"
              />
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
