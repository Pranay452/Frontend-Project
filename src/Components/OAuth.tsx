import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase";
import axios from "axios";
import { signInSuccess } from "../Redux/User/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../Utils/Helper";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
