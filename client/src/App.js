import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import NavbarBottom from './components/NavbarBottom/NavbarBottom';
import HomePageTemp from './pages/HomePage/HomePage';
import CreatePostForm from './pages/CreatePost/CreatePost';

function App() {
  return (
    <Router>
      <Navbar/>
      <NavbarBottom />
      <Routes>
        <Route path="/" element={<HomePageTemp />}></Route>
        <Route path="/createPost" element={<CreatePostForm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
