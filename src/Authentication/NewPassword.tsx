import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import axios from "axios";

const NewPassword = ({ email }: { email: any }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Passwords cannot be empty");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword?.length < 8) {
      setError("Password must be atleast 8 characters long");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/resetPassword",
        { email, newPassword, confirmPassword }
      );
      if (response.data.status === "SUCCESS") {
        navigate("/signin");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  justify-center bg-gray-900 text-white">
      <div className="w-full max-w-lg p-10 space-y-6 bg-gray-800 rounded shadow-md animate__animated animate__fadeIn">
        <h2 className="text-3xl font-bold text-center mb-4">
          Set New Password
        </h2>
        <Label value="Enter new password" className="text-gray-300 text-lg" />
        <TextInput
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError("");
          }}
          className="border-gray-600 focus:border-purple-500 focus:ring-purple-500 text-black text-lg"
        />
        <Label value="Confirm new password" className="text-gray-300 text-lg" />
        <TextInput
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          className="border-gray-600 focus:border-purple-500 focus:ring-purple-500 text-black text-lg"
        />
        <Button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full bg-gradient-to-r from-gray-600 to-gray-300 hover:from-gray-700 hover:to-gray-400 text-white font-bold  px-6  md:px-6 rounded-full animate__animated animate__zoomIn"
        >
          {loading ? <Spinner size="sm" /> : "Reset Password"}
        </Button>
        {error && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default NewPassword;
