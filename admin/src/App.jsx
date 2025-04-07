import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import List from "./components/List";
import Orders from "./components/Orders";
import { ToastContainer, toast } from 'react-toastify';


const App = () => {

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-[80%]">
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
