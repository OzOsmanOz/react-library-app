import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const EditBookForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [editBook, setEditBook] = useState({
    id: params.bookId,
    name: "",
    author: "",
    isbn: "",
    categoryId: "",
  });
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/books/${params.bookId}`)
      .then((res) => {
        setEditBook(res.data);
        axios
          .get("http://localhost:3004/categories")
          .then((res) => {
            setCategory(res.data);
          })
          .catch((err) => console.log("categories err", err));
      })
      .catch((err) => console.log("res err", err));
  }, []);

  const handleEditBook = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3004/books/${params.bookId}`, editBook)
      .then((res) => {
        console.log("edit res", res);
        navigate("/");
      })
      .catch((err) => console.log("edit err", err));
  };

  if (!editBook || !category) return <Loading />;
  return (
    <div className="container">
      <form onSubmit={handleEditBook} className="row g-3 my-5">
        <h4 className="text-center fw-semibold">Edit Book</h4>
        <div className="col-6">
          <input
            onChange={(e) => setEditBook({ ...editBook, name: e.target.value })}
            value={editBook.name}
            type="text"
            className="form-control fs-6"
            placeholder="Book name"
            aria-label="Book name"
          />
        </div>
        <div className="col-6">
          <input
            onChange={(e) =>
              setEditBook({ ...editBook, author: e.target.value })
            }
            value={editBook.author}
            type="text"
            className="form-control fs-6"
            placeholder="Author name"
            aria-label="Author name"
          />
        </div>

        <div className="col-6">
          <input
            onChange={(e) => setEditBook({ ...editBook, isbn: e.target.value })}
            value={editBook.isbn}
            type="text"
            className="form-control fs-6"
            placeholder="Isbn"
            aria-label="Isbn"
          />
        </div>
        <div className="col-6">
          <select
            onChange={(e) =>
              setEditBook({ ...editBook, categoryId: e.target.value })
            }
            className="form-select"
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
              className="btn btn-sm btn-outline-success fw-semibold me-3 w-50"
            >
              Save
            </button>
            <Link
              to={"/"}
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

export default EditBookForm;
