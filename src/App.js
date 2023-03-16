import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ListBooks from "./components/ListBooks";
import AddBook from "./components/AddBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListBooks />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
