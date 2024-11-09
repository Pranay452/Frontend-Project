import { Button } from "flowbite-react";
import React, { useContext } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase";
import axios from "axios";
import { signInSuccess } from "../Redux/User/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../Utils/Helper";
import { AuthContext } from "../Provider/AuthProvider";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setAuthToken } = useContext(AuthContext);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const { displayName, photoURL, email } = resultFromGoogle?.user || {};
      console.log("resultFromGoogle", resultFromGoogle);
      const result = await axios.post(
        "http://localhost:5000/api/v1/auth/google",
        {
          username: displayName,
          email,
        }
      );
      const { status, user, accessToken } = result?.data || {};
      if (status === "SUCCESS") {
        setCookie("accessToken", accessToken, 1);
        setAuthToken(accessToken);
        dispatch(
          signInSuccess({
            ...user,
            profilePicture: photoURL,
          })
        );
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="grayToBlack"
      outline
      onClick={handleGoogleClick}
      className="bg-gradient-to-r from-gray-600 to-gray-300 hover:from-gray-700 hover:to-gray-400 text-white font-bold  animate__animated animate__zoomIn"
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
