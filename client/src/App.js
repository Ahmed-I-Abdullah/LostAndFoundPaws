import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useMobile } from "./MobileContext";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import NavbarBottom from "./components/NavbarBottom/NavbarBottom";
import HomePageTemp from "./pages/HomePage/HomePage";
import CreatePostForm from "./pages/CreatePost/CreatePost";
import MyPostsAndComments from "./pages/MyPostsAndComments/MyPostsAndComments";
import ViewPostPage from "./pages/ViewPost/ViewPostPage";
import ViewReportings from "./pages/ViewReportings/ViewReportings";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<HomePageTemp />} />
            <Route path="/createPost" element={<CreatePostForm />} />
            <Route
              path="/myPostsAndComments"
              element={<MyPostsAndComments />}
            />
            <Route path="/viewPost" element={<ViewPostPage />} />
            <Route path="/viewReportings" element={<ViewReportings />} />
          </Routes>
        </div>
        <NavbarBottom />
      </div>
    </Router>
  );
}

export default App;
