import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Loading from "./Loading";

const ListBooks = (props) => {
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);

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
  }, []);

  if (!books || !categories) return <Loading />;

  return (
    <div>
      <div className="container my-5">
        <div className="d-flex justify-content-end mb-4">
          <Link to={"/add-book"} className="btn btn-sm btn-success fw-semibold">
            Add Book
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Book Name</th>
              <th className="text-center">Author</th>
              <th className="text-center">Categories</th>
              <th>Isbn</th>
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
                  <td>{book.isbn}</td>
                  <div>
                    <button className="btn btn-sm btn-danger py-0">
                      Delete
                    </button>
                  </div>
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
