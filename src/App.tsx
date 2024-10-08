import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ForgotPassword from "./Authentication/ForgotPassword";
// import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
// import PrivateRoute from "./components/PrivateRoute";
// import About from "./componen/About";
import About from "./Components/About";
import Contact from "./Components/Contact";
// import CreatePost from "./pages/CreatePost";
// import Dashboard from "./pages/Dashboard";
// import Home from "./pages/Home";
// import Projects from "./pages/Projects";
import SignIn from "./Authentication/Signin";
import SignUp from "./Authentication/Signup";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import ImageUpload from "./Components/ImageUpload";
import Myorders from "./Components/Myorders";
import Gallery from "./Components/Gallery";
// import UpdatePost from "./pages/UpdatePost";
import Allorders from "./Components/AllOrders";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/myorders" element={<Myorders />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/allorders" element={<Allorders />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
