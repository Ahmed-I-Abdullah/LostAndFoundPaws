import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import HomePageTemp from './pages/homePage/HomePage';
import CreatePostForm from './pages/createPost/CreatePost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageTemp />}></Route>
        <Route path="/createPost" element={<CreatePostForm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
