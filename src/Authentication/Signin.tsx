import axios from "axios";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import signin from "../assets/signin.jpg";
import SigninHeader from "../assets/signInHeader.png";
import OAuth from "../Components/OAuth";
import { AuthContext } from "../Provider/AuthProvider";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  UserType,
} from "../Redux/User/UserSlice";
import { setCookie, validateEmail } from "../Utils/Helper";

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

  const { setAuthToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state: UserType) => state.user);

  const { email, password } = formData;

  const clearErrorState = () => {
    dispatch(signInFailure(null));
  };

  useEffect(() => {
    window.addEventListener("beforeunload", clearErrorState);

    return () => window.removeEventListener("beforeunload", clearErrorState);
  }, []);

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

    const emailValidation = validateEmail(email);
    if (!emailValidation) {
      dispatch(signInFailure("Please enter a valid email"));
      return;
    }

    try {
      dispatch(signInStart());
      axios
        .post("http://localhost:5000/api/v1/signin", formData)
        .then((res) => {
          const { status, user, accessToken } = res?.data || {};
          if (status === "SUCCESS") {
            // console.log("hello");
            localStorage.setItem("email", res?.data?.user?.email);
            setCookie("accessToken", accessToken, 1);
            setAuthToken(accessToken);
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
    <div className="min-h-screen flex items-center justify-center  opacity-75 p-4">
      <div className="w-full max-w-4xl bg-gray-600 shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left - Image Section */}
          <div className="md:w-1/2 relative hidden md:block">
            <img
              // src={signin}
              // src={
              //   "https://pranaymanepallybucket.s3.ap-south-1.amazonaws.com/assets/signin.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIASFUIRRI52U3IIU5J%2F20241109%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241109T084108Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRjBEAiAUPlFJ1vF2sJQR4ZmJg0I4eAuKPoBW2mgSU99dcYi5dQIgX9vP22Wv51EEJwH9wi%2FEusrSAWXuduRG1OA%2BeV0f20Uq7AIIchAAGgwxNDk1MzY0NzU3MDciDIszGNBU4PEVVSPBCSrJAkGYWkIjCwQYXpjdfuabFABUSRd6xxMNvqpvjcbQDOaGnyIIqI4v2rpC6ERrHmHwul2LQp7Nn7vq5sdWMcgjRFtwwJVZeaimB4eSHu2cQW7g%2Bw4Nqdzp1zmxE5rj7eKuy%2F8ASLcdE3iScyb8fzqD8QbJXZ2MBcSroZoo2IiDGqkIRQuMC4paqzdGg1hawtSDtMsgFJxrYNfi7Wmh4kZRkWoWmjCHwDMitCktTDx81HjC24uNuXPYUBomzTAdDKO4%2B0GSmeXt2nMj%2BK6YI4rz4Xdvze%2Fgu%2Bzn%2FB%2B9ocX5egVH45fEmYM5MksBtUjsB69ISnHGHgky4%2FuXWcGgiLdo7CjPGlLTmcIdcNsV9hDbbGHDOhiRIcxlP077mhwRdO8DncsSmST81AYGG5Rn2UBjoLsMIkiq%2FAj9Gf5HrAZ31dxS%2BHojU01cGsjiMMqnvLkGOrQCyEPDl%2FtLv6PRUZNSmzPbpC8pmG6GSjy6VPnUQa7e0puls2YNdJsm6etlo%2B%2FoY41jsAFSh5tjmqA0V7XcTz7fR2xs6YCjhC0jwVpHJ0SbzqGqTBwaGVxWFqBuhMSfnT9CvxHIeUpUMel1SHox%2FUnaOwsP6CugsvoiOohnOZBGs0FgGTBQ%2B52%2FzbqDrGH7jmpxchNpsyBfbwWcZoZpE2m1F5LJPeAvgDUnbvLrPKJ5xDbyMpI8ARZtEqAI1FH97NDKt7YoiPiqL%2BUFP2c65nHTZBY1CAr6HE2yp9K407y1WkUYCq6v69oGQmHi3Smd0w2PH%2F2vSiVmtrp7Z2orCphFr5yujnTSfBbYI3cZVdJzzOwo65hj8A1C0xkmL6NL8hqvrl%2BYJVbAs32FK2w7BAAK92fCrsw%3D&X-Amz-Signature=467e53fc6baf0a47df46f3be85d134b9d93209cb00c8a8d00d81bf9424268100&X-Amz-SignedHeaders=host&response-content-disposition=inline"
              // }
              src="https://pranaymanepallybucket.s3.ap-south-1.amazonaws.com/assets/signin.jpg"
              alt="Sign In"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-40"></div>
          </div>

          {/* Right - Form Section */}
          <div className="w-full md:w-1/2 p-8">
            {/* <img src={SigninHeader} alt="" /> */}
            <img
              src="https://pranaymanepallybucket.s3.ap-south-1.amazonaws.com/assets/signInHeader.png"
              alt=""
            />

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-4 mt-6">
                <div>
                  <Label value="Email" />
                  <TextInput
                    type="email"
                    placeholder="name@company.com"
                    id="email"
                    onChange={handleChange}
                    className="border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <Label value="Password" />
                  <TextInput
                    type="password"
                    placeholder="************"
                    id="password"
                    onChange={handleChange}
                    className="border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end mb-4">
                <p
                  className="underline text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out cursor-pointer"
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                >
                  Forgot Password?
                </p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-gray-600 to-gray-300 hover:from-gray-700 hover:to-gray-400 text-white font-bold  px-6 md:py-2 md:px-6 rounded-full animate__animated animate__zoomIn"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" light={true} />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <OAuth />
            </form>

            <div className="flex gap-2 text-sm mt-5 justify-center md:justify-start">
              <span>Don't Have an account?</span>
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out cursor-pointer"
              >
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
