import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <BeatLoader />
    </div>
  );
};

export default Loading;
