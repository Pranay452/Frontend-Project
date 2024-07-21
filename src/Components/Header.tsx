// import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
// import Cookies from "js-cookie";
// import { AiOutlineSearch } from "react-icons/ai";
// import { FaMoon, FaSun } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ThemeType, toggleTheme } from "../Redux/Theme/ThemeSlice";
// import { signOut, UserType } from "../Redux/User/UserSlice";

// const Header = () => {
//   const path = useLocation().pathname;
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state: UserType) => state.user);
//   const { theme } = useSelector((state: ThemeType) => state.theme);
//   const navigate = useNavigate();

//   const handleSignOut = () => {
//     Cookies.remove("accessToken");
//     dispatch(signOut());
//     navigate("/signin");
//   };

//   return (
//     <Navbar className="border-b-2 top-0 fixed w-full">
//       <Link
//         to="/"
//         className="self-center whitespace-nowrap test-sm sm:text-xl font-semibold dark:text-white"
//       >
//         <span className="px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg ">
//           Pramodhini
//         </span>
//         Arts
//       </Link>
//       <form>
//         <TextInput
//           type="text"
//           placeholder="Search..."
//           rightIcon={AiOutlineSearch}
//           className="hidden lg:inline"
//         />
//       </form>
//       <Button className="w-12 h-10 lg:hidden" color="gray" pill>
//         <AiOutlineSearch />
//       </Button>
//       <div className="flex gap-2 md:order-2">
//         <Button
//           className="w-12 h-10 hidden sm:inline"
//           color="gray"
//           pill
//           onClick={() => dispatch(toggleTheme())}
//         >
//           {theme === "light" ? <FaSun /> : <FaMoon />}
//         </Button>
//         {currentUser ? (
//           <Dropdown
//             arrowIcon={false}
//             inline
//             label={
//               <Avatar alt="user" rounded img={currentUser.profilePicture} />
//             }
//           >
//             <Dropdown.Header>
//               <span className="block text-sm">{currentUser.username}</span>
//               <span className="block text-sm font-medium truncate">
//                 {currentUser.email}
//               </span>
//             </Dropdown.Header>
//             <Link to="/profile">
//               <Dropdown.Item>Profile</Dropdown.Item>
//             </Link>
//             <Dropdown.Divider />
//             <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
//           </Dropdown>
//         ) : (
//           <Link to="signin">
//             <Button gradientDuoTone="purpleToBlue" outline>
//               Sign In
//             </Button>
//           </Link>
//         )}
//         <Navbar.Toggle />
//       </div>
//       <Navbar.Collapse>
//         <Navbar.Link active={path === "/"} as="div">
//           <Link to="/">Home</Link>
//         </Navbar.Link>
//         <Navbar.Link active={path === "/about"} as="div">
//           <Link to="/about">About Us</Link>
//         </Navbar.Link>
//         <Navbar.Link active={path === "/about"} as="div">
//           <Link to="/contact">Contact Us</Link>
//         </Navbar.Link>
//         {/* <Navbar.Link active={path === "/projects"} as="div">
//           <Link to="/projects">Projects</Link>
//         </Navbar.Link> */}
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// export default Header;

import axios from "axios";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeType, toggleTheme } from "../Redux/Theme/ThemeSlice";
import { signOut, UserType } from "../Redux/User/UserSlice";
import Cookies from "js-cookie";

const Header: React.FC = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: UserType) => state.user);
  const { theme } = useSelector((state: ThemeType) => state.theme);
  const navigate = useNavigate();

  const handleSignOut = () => {
    Cookies.remove("accessToken");
    dispatch(signOut());
    navigate("/signin");
  };

  return (
    // border border-l-0 border-r-0 border-b-0 border-t-1 border-purple-500 fixed bottom-0 w-full
    <Navbar className="border-b-2 border-blue-500 fixed w-full z-50">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg ">
          Pramodhini
        </span>
        Arts
      </Link>
      {/* <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form> */}
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-4 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
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
          <Link to="signin">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as="div">
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/Gallery"} as="div">
          <Link to="/signin">Gallery</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as="div">
          <Link to="/about">About Us</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/contact"} as="div">
          <Link to="/contact">Contact Us</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/signup"} as="div">
          <Link to="/signup">Sign Up</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
