import axios from "axios";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";

interface FormData {
  username?: string;
  email?: string;
  password?: string;
  contact_number?: number;
}

interface InputChangEvent {
  target: { id: string; value: string };
}

interface InputSubmitEvent {
  preventDefault: Function;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { username, email, password, contact_number } = formData || {};

  const handleChange = (e: InputChangEvent) => {
    error !== "" && setError("");
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  };

  const handleSubmit = async (e: InputSubmitEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !contact_number) {
      setError("Please fill out all fields");
      return;
    }

    try {
      setLoading(true);
      axios
        .post("http://localhost:5000/api/v1/signUp", formData)
        .then((res) => {
          const { status } = res?.data || {};
          console.log("Response", res);
          if (status === "SUCCESS") {
            navigate("/signin");
          }
        })
        .catch((error) => {
          const { status, message } = error?.response?.data || {};
          if (status === "FAILED") {
            setError(message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      const typedError = error as { message: string };
      setLoading(false);
      setError(typedError.message);
    }
  };

  return (
    <div className="flex flex-col  min-h-screen">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 mt-40">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg ml-20">
              Pramodhini
            </span>
            <br />

            <p className="flex  justify-center mt-4">Arts</p>
          </Link>

          <p className="text-sm mt-5">
            Please Signup to get started. You can sign up with your email and
            password or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Contact Number" />
              <TextInput
                type="number"
                placeholder="Contact Number"
                id="contact_number"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
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
  );
};

export default SignUp;
