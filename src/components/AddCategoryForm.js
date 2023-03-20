import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddCategoryForm = () => {
  const navigate = useNavigate();
  const [categoryForm, setCategoryForm] = useState({
    id: String(new Date().getTime()),
    name: "",
  });

  const handleAddCategory = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3004/categories", categoryForm)
      .then((res) => {
        navigate("/categories");
      })
      .catch((err) => console.log("category post err", err));
  };

  return (
    <div className="container">
      <form onSubmit={handleAddCategory} className="row g-3 my-5">
        <h4 className="text-center fw-semibold">Add Category</h4>
        <div className="col-12">
          <input
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, name: e.target.value })
            }
            value={categoryForm.category}
            type="text"
            className="form-control fs-6"
            placeholder="Category Name"
            aria-label="Name"
          />
        </div>

        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center w-50">
            <button
              type="submit"
              className="btn btn-sm btn-outline-success fw-semibold me-3 w-50"
            >
              Add
            </button>
            <Link
              to={"/categories"}
              className="btn btn-sm btn-outline-secondary fw-semibold w-50"
            >
              Close
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
