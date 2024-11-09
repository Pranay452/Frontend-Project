import "animate.css";
import axios from "axios";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { UserType } from "../Redux/User/UserSlice";
import SuccessModal from "./SuccessModal";
import { validateEmail, validateMobile } from "../Utils/Helper";

const ImageUploadScreen: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [addFrame, setAddFrame] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    email: "",
    flat: "",
    locality: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  const [addressError, setAddressError] = useState({
    nameError: "",
    mobileError: "",
    emailError: "",
    flatError: "",
    localityError: "",
    landmarkError: "",
    cityError: "",
    stateError: "",
    countryError: "",
    pincodeError: "",
  });
  const { authToken, isAuthenticated } = useContext(AuthContext);
  const { currentUser } = useSelector((state: UserType) => state.user);
  const { username, email, contact_number } = currentUser || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileResponsive, setMobileResponsive] = useState<any>(false);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setAddress((prev) => ({
      ...prev,
      email: email || "",
      mobile: String(contact_number || ""),
    }));
  }, [currentUser]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setMobileResponsive(true);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    const errorKey = `${name}Error`;

    if (name === "mobile" || name === "pincode") {
      value = value.replace(/[^\d]/g, "");
    }

    setAddress((prev) => ({ ...prev, [name]: value }));
    setAddressError((prev) => ({ ...prev, [errorKey]: "" }));
  };

  const handleNext = async () => {
    for (const key in address) {
      const errorKey = `${key}Error`;
      if (address[key as keyof typeof address] === "") {
        setAddressError((prev) => ({
          ...prev,
          [errorKey]: `Please Enter ${key}`,
        }));
        return;
      }
      if (key === "mobile") {
        const mobileValidation = validateMobile(address[key]);
        if (!mobileValidation) {
          setAddressError((prev) => ({
            ...prev,
            mobileError: "Please enter valid Mobile Number",
          }));
          return;
        }
        if (address[key]?.length <= 9) {
          setAddressError((prev) => ({
            ...prev,
            mobileError: "Mobile Number should be 10 digits",
          }));
          return;
        }
      }
      if (key === "pincode") {
        if (address[key]?.length <= 5) {
          setAddressError((prev) => ({
            ...prev,
            pincodeError: "PinCode should be of 6 digits",
          }));
          return;
        }
      }
      if (key === "email") {
        const mobileValidation = validateEmail(address[key]);
        if (!mobileValidation) {
          setAddressError((prev) => ({
            ...prev,
            [errorKey]: `Please Enter valid email address`,
          }));
          return;
        }
      }
      if (address[key as keyof typeof address]?.length < 3) {
        setAddressError((prev) => ({
          ...prev,
          [errorKey]: `Please Enter valid ${key}`,
        }));
        return;
      }
    }

    const createdAt = new Date().toISOString();
    const estimatedTime = new Date();
    estimatedTime.setDate(estimatedTime.getDate() + 21);

    const formData = {
      image: String(preview),
      addFrame,
      address,
      createdAt,
      estimatedTime: estimatedTime.toISOString(),
    };

    try {
      await axios.post("http://localhost:5000/api/v1/order", formData);
      setShowSummary(true);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 21); // 21 days from today

  const basePrice = 500;
  const framePrice = 100;
  const deliveryPrice = 100;
  const totalPrice = basePrice + (addFrame ? framePrice : 0) + deliveryPrice;

  const onPaymentSuccess = (resp: any, orderId: string) => {
    const { razorpay_payment_id, razorpay_signature } = resp || {};
    const { email, name, mobile } = address;

    const createdAt = new Date().toISOString();

    const paylaod = {
      orderId,
      paymentId: razorpay_payment_id,
      amount: totalPrice,
      email,
      username: name,
      contactNumber: mobile,
      createdAt,
    };
    axios
      .post("http://localhost:5000/api/v1/payment/verify", paylaod, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "x-razorpay-signature": razorpay_signature,
        },
      })
      .then((res) => {
        const { success, message } = res?.data || {};
        if (success) {
          if (!isAuthenticated) {
            localStorage.setItem("email", address?.email);
          }
          toast.success(message);
          setIsModalOpen(true);
        } else {
          toast.error(message || "Payment Failed. Please try after some time.");
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        const { message } = error?.response?.data || {};
        toast.error(message || "Payment Failed. Please try after some time.");
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onPaymentError = (response: any) => {
    const { description } = response?.error || {};
    setTimeout(() => {
      toast.error(
        description || "Something went wrong. Please try again later."
      );
    }, 6000);
  };

  const initiateRazorpay = (orderId: string, amount: number) => {
    var options = {
      key: process.env.RAZORPAY_KEY,
      amount: amount,
      currency: "INR",
      name: "Pramodhini Arts",
      description: "Sketches",
      image:
        "https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr",
      order_id: orderId,
      handler: (response: any) => {
        onPaymentSuccess(response, orderId);
      },
      prefill: {
        name: username,
        email: address.email,
        contact: contact_number || address.mobile,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        confirm_close: true,
      },
      retry: {
        enabled: false,
      },
    };

    // @ts-ignore
    const rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function (response: any) {
      onPaymentError(response);
    });
  };

  const onPressPayNow = () => {
    const paylaod = { amount: totalPrice };
    console.log("payload", paylaod);
    axios
      .post("http://localhost:5000/api/v1/order/create", paylaod, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const { status, orderId, amount } = response?.data || {};
        if (status && String(status).toLowerCase() === "created") {
          initiateRazorpay(orderId, amount);
        }
      })
      .catch((error) => {
        const { message } = error?.response?.data || {};
        const showMessage = message || "Something went wrong";
        toast.success(showMessage);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-28 overflow-y-auto">
      <div className=" bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg w-full  flex flex-col lg:flex-row gap-6 justify-center">
        {/* Left Section: Image Upload and Frame Option */}

        <div className="flex-1 lg:w-[40%]">
          <h2 className="text-4xl sm:text-3xl font-bold mb-4 animate__animated animate__fadeInDown">
            Upload Your Image
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4 p-2 rounded-lg border border-gray-500 bg-gray-700 text-white focus:ring focus:ring-purple-600 animate__animated animate__fadeInUp w-[240px]"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mb-4 max-w-full h-80 rounded-lg animate__animated animate__zoomIn"
            />
          )}
          {preview && (
            <div className="mb-4 animate__animated animate__fadeInUp">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={addFrame}
                  onChange={(e) => setAddFrame(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
                <span className="text-lg">Add a Photo Frame</span>
              </label>
            </div>
          )}
        </div>

        {/* Middle Section: Delivery Address */}
        <div className="flex flex-col items-center justify-center flex-1 lg:w-[60%]">
          {preview && (
            <>
              <h3 className="text-2xl font-bold mb-4">Delivery Address</h3>
              <div className="">
                {Object.keys(address).map((key) => {
                  const isMobileNumber = key === "mobile";
                  const isPinCode = key === "pincode";
                  const errorText =
                    addressError[`${key}Error` as keyof typeof addressError];
                  const isEmail = key === "email";
                  return (
                    <div key={key}>
                      <input
                        disabled={showSummary || (isEmail && isAuthenticated)}
                        type="text"
                        name={key}
                        maxLength={
                          isMobileNumber ? 10 : isPinCode ? 6 : undefined
                        }
                        value={(address as any)[key]}
                        onChange={handleInputChange}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        className={`p-2 rounded-lg border ${
                          errorText?.length === 0
                            ? "border-gray-500 focus:ring-purple-600"
                            : "border-red-700 focus:ring-red-800"
                        } bg-gray-700 text-white focus:ring `}
                        required
                      />
                      <p className="text-red-500 text-sm ml-2 mt-1">
                        {errorText}
                      </p>
                    </div>
                  );
                })}
              </div>
              {!showSummary && (
                <button
                  onClick={handleNext}
                  className="mt-4 w-[280px] bg-gradient-to-r from-gray-600 to-gray-300 hover:from-gray-700 hover:to-gray-400 text-white font-bold  px-6 md:py-2 md:px-6 rounded-full animate__animated animate__zoomIn"

                  // className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full mt-4"
                >
                  Next
                </button>
              )}
            </>
          )}
        </div>
        {/* </div> */}

        {/* Right Section: Pricing Details */}
        {showSummary && (
          <div className="flex-1 lg:w-1/3 bg-gray-700 p-6 rounded-lg">
            <p className="text-lg mb-2">
              Expected Delivery Date: {deliveryDate.toDateString()}
            </p>
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <p className="text-lg mb-2">Price Breakdown:</p>
              <ul className="list-disc list-inside mb-2">
                <li>Picture: ₹{basePrice}</li>
                <li>Frame: ₹{addFrame ? framePrice : 0}</li>
                <li>Delivery: ₹{deliveryPrice}</li>
              </ul>
              <p className="text-lg font-bold">Total: ₹{totalPrice}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={onPressPayNow}
                className="mt-4 w-[230px] bg-gradient-to-r from-gray-600 to-gray-300 hover:from-gray-700 hover:to-gray-400 text-white font-bold  px-6 md:py-2 md:px-6 rounded-full animate__animated animate__zoomIn"
                // className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full"
              >
                Pay Now
              </button>
            </div>
          </div>
        )}
      </div>
      <SuccessModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ImageUploadScreen;
