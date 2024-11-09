import axios from "axios";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signup from "../assets/signup.jpg";
import SigninHeader from "../assets/signInHeader.png";

// Validation Helpers
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateMobile = (mobile: string) => {
  const mobileRegex = /^\d{10}$/; // Indian phone number format (10 digits, starting with 6-9)
  return mobileRegex.test(mobile);
};
// const mobileValidation = /^\d{10}$/.test(String(mobile));

interface FormData {
  username?: string;
  email?: string;
  password?: string;
  contact_number?: string;
}

interface InputChangEvent {
  target: { id: string; value: string };
}

interface InputSubmitEvent {
  preventDefault: Function;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const isEmailPresent = useRef(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setFormData((prev) => ({
        ...prev,
        email,
      }));
      isEmailPresent.current = true;
    }
  }, []);

  const navigate = useNavigate();

  const handleChange = (e: InputChangEvent) => {
    setError("");
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleOtpChange = (e: any) => {
    setError("");
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: InputSubmitEvent) => {
    e.preventDefault();
    const { username, email, password, contact_number } = formData || {};

    // Validation checks
    if (!username || !email || !password || !contact_number) {
      setError("Please fill out all fields");
      return;
    }

    // Validate username (only alphabetic characters and at least 3 chars)
    if (!/^[a-zA-Z\s]+$/.test(username) || username.length < 3) {
      setError(
        "Username should contain only alphabetic characters and be at least 3 characters long."
      );
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password (at least 8 characters)
    if (password.length < 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }

    // Validate contact number (10-digit number)
    if (!validateMobile(contact_number)) {
      setError("Please enter a valid 10-digit contact number.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/signUp",
        formData
      );
      if (res.status === 200) {
        setIsOtpSent(true);
      }
    } catch (error: any) {
      setError(error.response.data.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: any) => {
    e.preventDefault();
    const { email } = formData;
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/v1/verifyOtp", {
        email,
        otp,
      });
      if (res.status === 201) {
        localStorage.removeItem("email");
        navigate("/signin");
      }
    } catch (error: any) {
      setError(error.response.data.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-transparent opacity-75 p-4">
      <div className="w-full max-w-4xl bg-gray-600 shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left - Image Section */}
          <div className="md:w-1/2 relative hidden md:block">
            <img
              // src={Signup}
              src="https://pranaymanepallybucket.s3.ap-south-1.amazonaws.com/assets/signup.jpg"
              alt="Sign Up"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-40"></div>
          </div>

          {/* Right - Form Section */}
          <div className="w-full md:w-1/2 p-8">
            {/* <Link
              to="/"
              className="text-4xl font-bold text-gray-900 mb-6 block text-center md:text-left"
            >
              <span className="px-2 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-300 text-white rounded-lg">
                Pramodhini
              </span>
              <br />
              <p className="mt-4 text-gray-400">Arts</p>
            </Link> */}
            {/* <img src={SigninHeader} alt="" className="mb-6" /> */}
            <img
              src="https://pranaymanepallybucket.s3.ap-south-1.amazonaws.com/assets/signInHeader.png"
              alt="mb-6"
            />

            {!isOtpSent ? (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-4">
                  <div>
                    <Label value="Username" />
                    <TextInput
                      type="text"
                      placeholder="Username"
                      id="username"
                      onChange={handleChange}
                      className="border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                  <div>
                    <Label value="Email" />
                    <TextInput
                      type="email"
                      placeholder="name@company.com"
                      id="email"
                      value={formData.email}
                      disabled={isEmailPresent.current}
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
                  <div>
                    <Label value="Contact Number" />
                    <TextInput
                      type="text"
                      placeholder="Contact Number"
                      id="contact_number"
                      onChange={handleChange}
                      className="border-gray-300 rounded-md shadow-sm"
                      maxLength={10}
                    />
                  </div>
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
                    "Sign Up"
                  )}
                </Button>
              </form>
            ) : (
              <div className="mt-14">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleOtpSubmit}
                >
                  <div>
                    <Label value="Enter OTP" />
                    <TextInput
                      type="text"
                      placeholder="OTP"
                      id="otp"
                      onChange={handleOtpChange}
                      className="border-gray-300 rounded-md shadow-sm mt-4"
                    />
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
                      "Submit OTP"
                    )}
                  </Button>
                </form>
              </div>
            )}

            <div className="flex gap-2 text-sm mt-5 justify-center md:justify-start">
              <span>Already have an account?</span>
              <Link
                to="/signin"
                className="text-blue-400 hover:text-blue-300 transition duration-300 ease-in-out cursor-pointer"
              >
                Sign In
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

export default SignUp;
