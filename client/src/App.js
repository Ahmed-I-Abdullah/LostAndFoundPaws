import React from "react";
import { useMobile } from "./MobileContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import NavbarBottom from "./components/NavbarBottom/NavbarBottom";
import HomePageTemp from "./pages/HomePage/HomePage";
import CreatePostForm from "./pages/CreatePost/CreatePost";
import MyPostsAndComments from "./pages/MyPostsAndComments/MyPostsAndComments";
import ViewPostPage from "./pages/ViewPost/ViewPostPage";
import ViewReportings from "./pages/ViewReportings/ViewReportings";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword/ResetPassword";
import VerifyAccountPage from "./pages/VerifyAccount/VerifyAccount";
import CreateSightingForm from "./pages/CreateSighting/CreateSighting";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const noNavbarRoutes = [
    "/resetPassword",
    "/forgotPassword",
    "/verifyAccount",
  ];

  const hideNavbar = noNavbarRoutes.some((route) =>
    location.pathname.includes(route)
  );

  return (
    <div className="app">
      {!hideNavbar && <Navbar />}
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<HomePageTemp />} />
          <Route path="/createPost" element={<CreatePostForm />} />
          <Route path="/myPostsAndComments" element={<MyPostsAndComments />} />
          <Route path="/viewPost" element={<ViewPostPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
          <Route path="/verifyAccount" element={<VerifyAccountPage />} />
          <Route path="/viewReportings" element={<ViewReportings />} />
          <Route path="/createSighting" element={<CreateSightingForm />} />
        </Routes>
      </div>
      {!hideNavbar && <NavbarBottom />}
    </div>
  );
}

export default App;
