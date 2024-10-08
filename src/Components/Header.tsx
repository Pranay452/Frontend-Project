import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import React, { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeType, toggleTheme } from "../Redux/Theme/ThemeSlice";
import { signOut, UserType } from "../Redux/User/UserSlice";
import Cookies from "js-cookie";
import { AuthContext } from "../Provider/AuthProvider";
import { ResponsiveState } from "../Utils/responsiveState";
import logo from "../assets/logo.jpg";
// import HeaderLogo from "../assets/logo praney.png";
// import NewLogo from "../assets/tryLogo.jpg";
import NewLogo from "../assets/lastOne.jpg";

const Header: React.FC = () => {
  const email = localStorage.getItem("email");

  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: UserType) => state.user);
  const { theme } = useSelector((state: ThemeType) => state.theme);
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext);
  const { isMobileScreen } = ResponsiveState();
  const [isOpen, setIsOpen] = useState(false); // Toggle state for mobile

  const handleSignOut = () => {
    setIsOpen(false);
    Cookies.remove("accessToken");
    setAuthToken(undefined);
    localStorage.removeItem("email");
    dispatch(signOut());
    navigate("/signin");
  };

  return (
    <Navbar
      fluid
      className="border-b-2 fixed top-0 w-full z-50 bg-white dark:bg-gray-700"
    >
      {/* Left side: Logo */}
      <Link to="/" className="flex items-center">
        <img src={NewLogo} alt="" className="h-14 w-20" />
        {/* <span
          className="text-3xl font-bold bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(to right, #4b4b4b, #c0c0c0)",
          }}
        >
          Pramodhini
        </span>
        <span
          className="text-3xl font-bold bg-clip-text text-transparent ml-2"
          style={{
            backgroundImage: "linear-gradient(to right, #7d7d7d, #f2f2f2)",
          }}
        >
          Arts
        </span> */}
        {/* <img src={HeaderLogo} alt="" className="h-20 w-14" /> */}
      </Link>

      {/* Right side: Navigation Links, Search, Theme Toggle, User Profile */}
      <div className="ml-auto flex items-center gap-4">
        {/* Navigation Links for larger screens */}
        <div className="hidden sm:flex gap-6 items-center">
          <Link
            to="/"
            className={`text-gray-900 dark:text-gray-200 ${
              path === "/" ? "font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/gallery"
            className={`text-gray-900 dark:text-gray-200 ${
              path === "/gallery" ? "font-semibold" : ""
            }`}
          >
            Gallery
          </Link>
          <Link
            to="/about"
            className={`text-gray-900 dark:text-gray-200 ${
              path === "/about" ? "font-semibold" : ""
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`text-gray-900 dark:text-gray-200 ${
              path === "/contact" ? "font-semibold" : ""
            }`}
          >
            Contact Us
          </Link>
          {/* <Link
            to="/signup"
            className={`text-gray-900 dark:text-gray-200 ${
              path === "/signup" ? "font-semibold" : ""
            }`}
          >
            Sign Up
          </Link> */}
          <Link
            to="/myorders"
            className={`text-gray-900 dark:text-gray-200 ${
              path === "/myorders" ? "font-semibold" : ""
            }`}
          >
            My Orders
          </Link>
          {currentUser?.isAdmin ? (
            <Link
              to="/allorders"
              className={`text-gray-900 dark:text-gray-200 mr-4 ${
                path === "/myorders" ? "font-semibold" : ""
              }`}
            >
              All Orders
            </Link>
          ) : (
            ""
          )}
        </div>

        {/* Theme Toggle */}
        {/* <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "" ? <FaSun /> : <FaMoon />}
        </Button> */}

        {/* User Profile / Sign In Button */}
        {!isMobileScreen && (
          <div>
            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="user" rounded img={currentUser.profilePicture} />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Link to="/profile">
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to="/signin">
                <Button gradientDuoTone="purpleToBlue" outline>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Mobile Hamburger Toggle */}
        <button
          className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-700 p-4 w-full absolute top-full left-0 z-50 shadow-lg">
          <Link
            to="/"
            className={`block py-2 ${path === "/" ? "font-semibold" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/gallery"
            className={`block py-2 ${
              path === "/gallery" ? "font-semibold" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            Gallery
          </Link>
          <Link
            to="/about"
            className={`block py-2 ${path === "/about" ? "font-semibold" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`block py-2 ${
              path === "/contact" ? "font-semibold" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
          {/* <Link
            to="/signup"
            className={`block py-2 ${
              path === "/signup" ? "font-semibold" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link> */}
          <Link
            to="/myorders"
            className={`block py-2 ${
              path === "/myorders" ? "font-semibold" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            My Orders
          </Link>
          {currentUser?.isAdmin ? (
            <Link
              to="/allorders"
              className={`block py-2 ${
                path === "/myorders" ? "font-semibold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              All Orders
            </Link>
          ) : (
            ""
          )}

          <Link to={""} onClick={handleSignOut}>
            Sign Out
          </Link>
        </div>
      )}
    </Navbar>
  );
};

export default Header;
