import axios from "axios";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import {
//   signInSuccess,
//   signInFailure,
//   signInStart,
// } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  UserType,
} from "../Redux/User/UserSlice";
import { setCookie } from "../Utils/Helper";
import OAuth from "../Components/OAuth";

interface FormData {
  email?: string;
  password?: string;
}

interface InputChangEvent {
  target: { id: string; value: string };
}

interface InputSubmitEvent {
  preventDefault: Function;
}

const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state: UserType) => state.user);

  const { email, password } = formData;

  const handleChange = (e: InputChangEvent) => {
    error !== "" && dispatch(signInFailure(""));
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value.trim(),
    }));
  };

  const handleSubmit = async (e: InputSubmitEvent) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(signInFailure("Please fill out all fields"));
      return;
    }

    try {
      dispatch(signInStart());
      axios
        .post("http://localhost:5000/api/v1/signin", formData)
        .then((res) => {
          const { status, user, accessToken } = res?.data || {};
          if (status === "SUCCESS") {
            setCookie("accessToken", accessToken, 1);
            dispatch(
              signInSuccess({
                ...user,
                profilePicture:
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              })
            );
            navigate("/");
          }
        })
        .catch((error) => {
          const { status, message } = error?.response?.data || {};
          if (status === "FAILED") {
            dispatch(signInFailure(message));
          }
        });
    } catch (error) {
      const typedError = error as { message: string };
      dispatch(signInFailure(typedError?.message));
    }
  };

  return (
    <div className="min-h-screen border border-gray-50">
      <div className="mt-44">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          {/* left */}
          <div className="flex-1">
            <Link to="/" className="text-4xl font-bold dark:text-white">
              <span className="px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg ">
                Pramodhini
              </span>
              <br />
              <p className="flex justify-center mt-4">Arts</p>
            </Link>
            {/* <p className="text-sm mt-5">
              You can sign in with your email and password or with Google.
            </p> */}
          </div>
          {/* right */}
          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-4">
                <div>
                  <Label value="Your email" />
                  <TextInput
                    type="email"
                    placeholder="name@company.com"
                    id="email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label value="Your password" />
                  <TextInput
                    type="password"
                    placeholder="************"
                    id="password"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
                className="mt-2"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Don't Have an account?</span>
              <Link to="/signup" className="text-blue-500">
                Sign Up
              </Link>
            </div>
            {error && (
              <Alert className="mt-5" color="failure">
                {error}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
