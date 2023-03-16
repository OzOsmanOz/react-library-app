import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";

function ListBooks(props) {
  const [books, setBooks] = useState(null);
  console.log("books", books);

  useEffect(() => {
    axios
      .get("http://localhost:3004/books")
      .then((res) => {
        console.log("res", res.data);
        setBooks(res.data);
      })
      .catch((err) => console.log("Res Err", err));
  }, []);

  if (!books) return null;

  return (
    <div>
      <Header />
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
            {books.map((book) => (
              <tr>
                <td>{book.name}</td>
                <td className="text-center">{book.author}</td>
                <td className="text-center">Kategori</td>
                <td>{book.isbn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListBooks;
