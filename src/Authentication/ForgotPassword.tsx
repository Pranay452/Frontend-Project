// import axios from "axios";
// import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "animate.css";

// const ForgotPassword = () => {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isResend, setIsResend] = useState(false); // New state to track if OTP is resent
//   const navigate = useNavigate();

//   const handleReSendOtp = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/v1/user/resendotp",
//         { email } // Correct payload format
//       );
//       console.log(response.data);
//       setIsResend(true); // Set to true when OTP is resent
//     } catch (error: any) {
//       console.log(error.message);
//       setError("Failed to resend OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendOtp = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/v1/user/forgotpassword",
//         { email }
//       );
//       if (response.data.status === "SUCCESS") {
//         setStep(2);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       setError("Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setLoading(true);
//     try {
//       const endpoint = isResend
//         ? "http://localhost:5000/api/v1/user/verifyresendotp"
//         : "http://localhost:5000/api/v1/user/verifyForgotPasswordOtp";
//       const response = await axios.post(endpoint, { email, otp });
//       if (response.data.status === "SUCCESS") {
//         setStep(3);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       setError("Failed to verify OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/v1/reset-password",
//         { email, newPassword }
//       );
//       if (response.data.status === "SUCCESS") {
//         navigate("/signin");
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       setError("Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//       <div className="w-full max-w-lg p-10 space-y-6 bg-gray-800 rounded shadow-md animate__animated animate__fadeIn">
//         <h2 className="text-3xl font-bold text-center mb-4">Forgot Password</h2>
//         {step === 1 && (
//           <>
//             <Label value="Enter your email" className="text-gray-300 text-lg" />
//             <TextInput
//               type="email"
//               placeholder="name@company.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="border-gray-600 focus:border-purple-500 focus:ring-purple-500 text-black text-lg"
//             />
//             <Button
//               gradientDuoTone="purpleToPink"
//               onClick={handleSendOtp}
//               disabled={loading}
//               className="w-full bg-purple-600 hover:bg-purple-800 text-lg"
//             >
//               {loading ? <Spinner size="sm" /> : "Send OTP"}
//             </Button>
//           </>
//         )}
//         {step === 2 && (
//           <>
//             <Label
//               value="Enter the OTP sent to your email"
//               className="text-gray-300 text-lg"
//             />
//             <TextInput
//               type="text"
//               placeholder="OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="border-gray-600 focus:border-purple-500 focus:ring-purple-500 text-black text-lg"
//             />
//             <Button
//               gradientDuoTone="purpleToPink"
//               onClick={handleVerifyOtp}
//               disabled={loading}
//               className="w-full bg-purple-600 hover:bg-purple-800 text-lg"
//             >
//               {loading ? <Spinner size="sm" /> : "Verify OTP"}
//             </Button>
//             <Button
//               gradientDuoTone="purpleToPink"
//               onClick={handleReSendOtp}
//               disabled={loading}
//               className="w-full bg-purple-600 hover:bg-purple-800 text-lg mt-4"
//             >
//               {loading ? <Spinner size="sm" /> : "Resend OTP"}
//             </Button>
//           </>
//         )}
//         {step === 3 && (
//           <>
//             <Label
//               value="Enter new password"
//               className="text-gray-300 text-lg"
//             />
//             <TextInput
//               type="password"
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="border-gray-600 focus:border-purple-500 focus:ring-purple-500 text-black text-lg"
//             />
//             <Label
//               value="Confirm new password"
//               className="text-gray-300 text-lg"
//             />
//             <TextInput
//               type="password"
//               placeholder="Confirm New Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="border-gray-600 focus:border-purple-500 focus:ring-purple-500 text-black text-lg"
//             />
//             <Button
//               gradientDuoTone="purpleToPink"
//               onClick={handleResetPassword}
//               disabled={loading}
//               className="w-full bg-purple-600 hover:bg-purple-800 text-lg"
//             >
//               {loading ? <Spinner size="sm" /> : "Reset Password"}
//             </Button>
//           </>
//         )}
//         {error && (
//           <Alert className="mt-5" color="failure">
//             {error}
//           </Alert>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
import axios from "axios";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";
import NewPassword from "./NewPassword";
import { validateEmail } from "../Utils/Helper";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  console.log("step", step);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [error, setError] = useState("");
  const [otpLoader, setotpLoader] = useState(false);

  const handleSendOtp = async (e: any, isResend = false) => {
    e.preventDefault();

    const emailValidation = validateEmail(email);
    if (!emailValidation) {
      setError("Please enter valid email");
      return;
    }

    setotpLoader(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/sendOtp",
        { email, isResend }
      );
      if (response.data.status === "SUCCESS") {
        setStep(2);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to send OTP");
    } finally {
      setotpLoader(false);
    }
  };

  const handleVerifyOtp = async () => {
    setVerifyLoader(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/verifyResetPasswordOtp",
        { email, otp }
      );
      if (response.data.status === "SUCCESS") {
        setStep(3); // Navigate to the set new password screen
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Failed to verify OTP");
    } finally {
      setVerifyLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-lg p-10 space-y-6 bg-gray-800 rounded shadow-md animate__animated animate__fadeIn">
        {step != 3 && (
          <h2 className="text-3xl font-bold text-center mb-4">
            Forgot Password
          </h2>
        )}
        {step === 1 && (
          <>
            <Label value="Enter your email" className="text-gray-300 text-lg" />
            <TextInput
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="border-gray-600 focus:border-purple-500 focus:ring-purple-500 text-black text-lg"
            />
            <Button
              onClick={handleSendOtp}
              disabled={verifyLoader || otpLoader}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-300 hover:from-gray-700 hover:to-gray-400 text-white font-bold  px-6  md:px-6 rounded-full animate__animated animate__zoomIn"
            >
              {otpLoader ? <Spinner size="sm" /> : "Send OTP"}
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <Label
              value="Enter the OTP sent to your email"
              className="text-gray-300 text-lg"
            />
            <TextInput
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setError("");
              }}
              className="border-gray-600 focus:border-purple-500 focus:ring-purple-500 text-black text-lg"
            />
            <Button
              onClick={handleVerifyOtp}
              disabled={verifyLoader || otpLoader || otp?.length < 6}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-300 hover:from-gray-700 hover:to-gray-400 text-white font-bold  px-6  md:px-6 rounded-full animate__animated animate__zoomIn"
            >
              {verifyLoader ? <Spinner size="sm" /> : "Verify OTP"}
            </Button>
            <Button
              onClick={(e: any) => handleSendOtp(e, true)}
              disabled={verifyLoader || otpLoader}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-300 hover:from-gray-700 hover:to-gray-400 text-white font-bold  px-6  md:px-6 rounded-full animate__animated animate__zoomIn"
            >
              {otpLoader ? <Spinner size="sm" /> : "Resend OTP"}
            </Button>
          </>
        )}
        {step === 3 && <NewPassword email={email} />}
        {error?.length > 0 && (
          <Alert className="mt-5" color="failure">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
