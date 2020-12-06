import React from "react";
import { BarLoader, BeatLoader, BounceLoader } from "react-spinners";

const Loading = () => {
  // return <BounceLoader />;
  // return <BarLoader />;
  return (
    <div className="d-flex justify-content-center">
      <BeatLoader />
    </div>
  );
};

export default Loading;
