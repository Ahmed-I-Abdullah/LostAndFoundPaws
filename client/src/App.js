import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import NavbarBottom from "./components/NavbarBottom/NavbarBottom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import VerifyAccount from "./pages/VerifyAccount/VerifyAccount"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import MyAccount from "./pages/MyAccount/MyAccount";
import CreatePostForm from "./pages/CreatePost/CreatePost";
import CreateSightingForm from "./pages/CreateSighting/CreateSighting";
import MyPostsAndComments from "./pages/MyPostsAndComments/MyPostsAndComments";
import ViewPostPage from "./pages/ViewPost/ViewPostPage";
import ViewReportsPage from "./pages/ViewReportings/ViewReportings";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

//Need AppContent instead of putting everything in App because useLocation needs to be context from <Router>
function AppContent() {
  const location = useLocation();
  const noNavPages = ["/login", "/signup", "/forgotPassword", "/resetPassword", "/verifyAccount"];
  const showNav = !noNavPages.includes(location.pathname);

  return (
    <div className="app">
      {showNav && <Navbar />}
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyAccount" element={<VerifyAccount />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/myAccount" element={<MyAccount />} />
          <Route path="/createPost" element={<CreatePostForm />} />
          <Route path="/createSighting" element={<CreateSightingForm />} />
          <Route path="/myPostsAndComments" element={<MyPostsAndComments />} />
          <Route path="/viewReports" element={<ViewReportsPage />} />
          <Route path="/pets/:id" element={<ViewPostPage />} />
        </Routes>
      </div>
      {showNav && <NavbarBottom />}
    </div>
  );
}

export default App;
