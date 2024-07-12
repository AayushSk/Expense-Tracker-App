import React from "react";

const Spinner = () => {
  return (
    <>
      <div className="flex justify-center mt-[300px]">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
