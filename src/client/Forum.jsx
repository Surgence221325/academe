import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./forum-components/Forum.css";
import Home from "./forum-components/Home";
import Replies from "./forum-components/Replies"
import Register from "./forum-components/Register"
import Login from "./forum-components/Login"


const Forum = () => {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/dashboard' element={<Home />} />
                  <Route path='/:id/replies' element={<Replies />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
};

export default Forum;
