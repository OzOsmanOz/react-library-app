import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddBookForm = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [addBookForm, setAddBookForm] = useState({
    id: String(new Date().getTime()),
    name: "",
    author: "",
    categoryId: "",
    isbn: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3004/categories")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log("Categories Err", err));
  }, []);

  const handleAddBook = (e) => {
    e.preventDefault();
    if (
      addBookForm.name === "" ||
      addBookForm.author === "" ||
      addBookForm.categoryId === ""
    ) {
      alert("BBook title, author name and category cannot be left blank.");
      return;
    }

    axios
      .post("http://localhost:3004/books", addBookForm)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log("AddBook res", err));
  };

  if (!category) return null;
  return (
    <div className="container">
      <form onSubmit={handleAddBook} className="row g-3 my-5">
        <h4 className="text-center fw-semibold">Add Book</h4>
        <div className="col-6">
          <input
            onChange={(e) =>
              setAddBookForm({ ...addBookForm, name: e.target.value })
            }
            value={addBookForm.name}
            type="text"
            className="form-control fs-6"
            placeholder="Book name"
            aria-label="Book name"
          />
        </div>
        <div className="col-6">
          <input
            onChange={(e) =>
              setAddBookForm({ ...addBookForm, author: e.target.value })
            }
            value={addBookForm.author}
            type="text"
            className="form-control fs-6"
            placeholder="Author name"
            aria-label="Author name"
          />
        </div>

        <div className="col-6">
          <input
            onChange={(e) =>
              setAddBookForm({ ...addBookForm, isbn: e.target.value })
            }
            value={addBookForm.isbn}
            type="text"
            className="form-control fs-6"
            placeholder="Isbn"
            aria-label="Isbn"
          />
        </div>
        <div className="col-6">
          <select
            onChange={(e) =>
              setAddBookForm({ ...addBookForm, categoryId: e.target.value })
            }
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">
              <select>Choose category</select>
            </option>
            {category.map((cat) => {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex justify-content-center w-50">
            <button
              type="submit"
              className="btn btn-sm btn-success fw-semibold me-3 w-50"
            >
              Add
            </button>
            <Link
              to={"/"}
              className="btn btn-sm btn-secondary fw-semibold w-50"
            >
              Close
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
