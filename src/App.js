import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddBook from "./pages/AddBook";
import AddCategory from "./pages/AddCategory";
import Categories from "./pages/Categories";
import EditBook from "./pages/EditBook";
import EditCategory from "./pages/EditCategory";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:bookId" element={<EditBook />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:catId" element={<EditCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
