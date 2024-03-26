import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePageTemp from './pages/HomePage/HomePage';
import CreatePostForm from './pages/CreatePost/CreatePost';
import MapView from './pages/MapView/MapView;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePageTemp />} />
        <Route path="/createPost" element={<CreatePostForm />} />
        <Route path="/mapView" element={<MapView />} />
      </Routes>
    </Router>
  );
}

export default App;
