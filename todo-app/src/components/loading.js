import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

function Loading() {
  return (
    <div className=" h-100 mt-5">
      <div className="row justify-content-center align-items-center h-100">
        <CircularProgress />
      </div>
    </div>
  );
}

export default Loading;
