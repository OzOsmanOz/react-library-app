import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Loading from "./Loading";

const ListBooks = (props) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3004/books")
      .then((res) => {
        setBooks(res.data);

        axios
          .get("http://localhost:3004/categories")
          .then((res) => {
            setCategories(res.data);
          })
          .catch((err) => console.log("categories err", err));
      })
      .catch((err) => console.log("books err", err));
  }, [didUpdate]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((res) => {
        setDidUpdate(!didUpdate);
      })
      .catch((err) => console.log("delete err", err));
  };

  if (!books || !categories) return <Loading />;

  return (
    <div>
      <div className="container my-5">
        <div className="d-flex justify-content-end mb-4">
          <Link
            to={"/add-book"}
            className="btn btn-sm btn-success fw-semibold py-0"
          >
            Add Book
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Book Name</th>
              <th className="text-center">Author</th>
              <th className="text-center">Categories</th>
              <th className="text-center">Isbn</th>
              <th className="text-center">Process</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const category = categories.find(
                (cat) => cat.id === book.categoryId
              );

              return (
                <tr key={book.id}>
                  <td>{book.name}</td>
                  <td className="text-center">{book.author}</td>
                  <td className="text-center">{category.name}</td>
                  <td className="text-center">
                    {!book.isbn ? "-" : book.isbn}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="btn btn-sm btn-danger py-0"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link
                      to={`edit-book/${book.id}`}
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
      </div>
    </div>
  );
};

export default ListBooks;
