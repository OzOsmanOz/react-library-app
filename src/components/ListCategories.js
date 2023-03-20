import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Modal from "./Modal";

const ListCategories = () => {
  const [categoriesState, setCategoriesState] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletedCategoryId, setDeletedCategoryId] = useState("");
  const [deletedCategoryName, setDeletedCategoryName] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        setCategoriesState(res.data);
      })
      .catch((err) => console.log("categories err", err));
  }, [didUpdate]);

  const handleDelete = (id) => {
    console.log("id", id);
    axios
      .delete(`http://localhost:3004/categories/${id}`)
      .then((res) => {
        setDidUpdate(!didUpdate);
      })
      .catch((err) => console.log("category delete err", err));
  };

  if (!categoriesState) return <Loading />;

  return (
    <div>
      <div className="container my-5">
        <div className="d-flex justify-content-end mb-4">
          <Link
            to={"/add-category"}
            className="btn btn-sm btn-success fw-semibold py-0"
          >
            Add Category
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th className="text-end">Process</th>
            </tr>
          </thead>
          <tbody>
            {categoriesState.map((cat) => {
              return (
                <tr key={cat.id}>
                  <td>{cat.name}</td>
                  <td className="text-end">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setDeletedCategoryId(cat.id);
                        setDeletedCategoryName(cat.name);
                      }}
                      className="btn btn-sm btn-danger py-0"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link
                      to={`/edit-category/${cat.id}`}
                      className="btn btn-sm btn-primary py-0 ms-2"
                    >
                      <i className="fa-solid fa-edit"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showModal === true && (
          <Modal
            onCancel={() => setShowModal(false)}
            onConfirm={() => handleDelete(deletedCategoryId)}
            title={deletedCategoryName}
            explanation="Are you sure you want to delete the category?"
          />
        )}
      </div>
    </div>
  );
};

export default ListCategories;
