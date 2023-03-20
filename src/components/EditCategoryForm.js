import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const EditCategoryForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [editCategory, setEditCategory] = useState({
    id: String(new Date().getTime()),
    name: "",
  });

  console.log("editCategory", editCategory);
  useEffect(() => {
    axios
      .get(`http://localhost:3004/categories/${params.catId}`)
      .then((res) => {
        setEditCategory(res.data);
      })
      .catch((err) => console.log("res err", err));
  }, []);
  const handleEditCategory = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3004/categories/${params.catId}`, editCategory)
      .then((res) => {
        navigate("/categories");
      })
      .catch((err) => console.log("category put err", err));
  };

  if (!editCategory) return <Loading />;

  return (
    <div className="container">
      <form onSubmit={handleEditCategory} className="row g-3 my-5">
        <h4 className="text-center fw-semibold">Edit Category</h4>
        <div className="col-12">
          <input
            onChange={(e) =>
              setEditCategory({ ...editCategory, name: e.target.value })
            }
            value={editCategory.name}
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

export default EditCategoryForm;
