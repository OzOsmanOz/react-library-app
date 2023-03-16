import React from "react";

import Header from "./Header";

const AddBook = (props) => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row g-3 my-5">
          <h4 className="text-center fw-semibold">Add Book</h4>
          <div class="col-6">
            <input
              type="text"
              className="form-control fs-6"
              placeholder="Book name"
              aria-label="Book name"
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control fs-6"
              placeholder="Author name"
              aria-label="Author name"
            />
          </div>
          <div class="col-6">
            <input
              type="text"
              className="form-control fs-6"
              placeholder="Categories"
              aria-label="Categories"
            />
          </div>
          <div className="col-6">
            <input
              type="text"
              className="form-control fs-6"
              placeholder="Isbn"
              aria-label="Isbn"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center w-50">
            <button className="btn btn-sm btn-success fw-semibold me-3 w-50">
              Add
            </button>
            <button className="btn btn-sm btn-secondary fw-semibold w-50">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
