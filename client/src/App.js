import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePageTemp from './pages/HomePage/HomePage';
import CreatePostForm from './pages/CreatePost/CreatePost';
import MyPostsAndComments from './pages/MyPostsAndComments/MyPostsAndComments';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePageTemp />}></Route>
        <Route path="/createPost" element={<CreatePostForm />}></Route>
        <Route path="/myPostsAndComments" element={<MyPostsAndComments />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
