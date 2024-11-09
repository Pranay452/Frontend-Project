import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "animate.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { UserType } from "../Redux/User/UserSlice";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Myorders: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<any>([]);
  const { authToken, isAuthenticated } = useContext(AuthContext);
  const [time, setTime] = useState(7);
  const navigate = useNavigate();
  const timeIntervalRef = useRef<NodeJS.Timeout>();

  const { currentUser } = useSelector((state: UserType) => state.user);

  useEffect(() => {
    if (!isAuthenticated || !authToken || authToken?.length === 0) {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
      // Automatically redirect after a delay, e.g., 5 seconds
      timeIntervalRef.current = setInterval(() => {
        onTimeChange();
      }, 1000);
    }
    (async () => {
      try {
        const payload: any = {
          email: currentUser?.email,
        };
        const response = await axios.post(
          "http://localhost:5000/api/v1/getorder",
          payload,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setOrderDetails(response?.data);
      } catch (error: any) {
        const { message } = error?.response?.data || error;
        if (message === "Unauthorized") return;
        toast.error(error.message);
      }
    })();

    return () => clearInterval(timeIntervalRef.current); // Clean up the timeout
  }, [authToken]);

  const onTimeChange = () => {
    setTime((prev) => {
      if (prev === 1) {
        setTimeout(() => {
          navigate("/signin");
        }, 100);
      }
      return prev - 1;
    });
  };

  return isAuthenticated ? (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      <div className="relative py-4 flex flex-col mt-20 h-full text-center text-white px-6 sm:px-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 animate__animated animate__fadeInDown">
          Your Orders
        </h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {orderDetails?.data?.length > 0 ? (
            orderDetails?.data?.map((order: any, index: any) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg animate__animated animate__fadeInUp flex flex-col justify-between"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-left">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 truncate">
                    {" "}
                    {/* Added truncate class */}
                    Order ID: {order._id}
                  </h2>
                  {order?.image && (
                    <img
                      src={`${order.image}`}
                      alt="Order"
                      className="mb-4 rounded-lg shadow-md object-cover h-48 w-full" // Adjust image size
                    />
                  )}
                  <div className="flex items-center mb-4">
                    <span className="font-medium mr-2">Frame Added:</span>
                    <span
                      className={`${
                        order?.addFrame ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {order?.addFrame ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">
                      Shipping Address:
                    </h3>
                    <p>
                      <strong>City:</strong> {order?.address?.city}
                    </p>
                    <p>
                      <strong>Country:</strong> {order?.address?.country}
                    </p>
                    <p className="max-w-[300px] whitespace-nowrap overflow-x-scroll">
                      <strong>Email:</strong> {order?.address?.email}
                    </p>
                    <p>
                      <strong>Flat:</strong> {order?.address?.flat}
                    </p>
                    <p>
                      <strong>Landmark:</strong> {order?.address?.landmark}
                    </p>
                    <p>
                      <strong>Locality:</strong> {order?.address?.locality}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {order?.address?.mobile}
                    </p>
                    <p>
                      <strong>Pincode:</strong> {order?.address?.pincode}
                    </p>
                    <p>
                      <strong>State:</strong> {order?.address?.state}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-lg animate__animated animate__fadeInUp">
              No orders found.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  ) : (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center p-6 sm:p-12 max-w-md">
        <h1 className="text-5xl sm:text-7xl font-bold mb-4 animate__animated animate__fadeInDown">
          Access Denied
        </h1>
        <p className="text-lg sm:text-2xl mb-8 animate__animated animate__fadeInUp">
          You must be logged in to view this page.
        </p>
        <button
          onClick={() => navigate("/signin")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full animate__animated animate__bounceIn"
        >
          Sign In Now
        </button>
        <p className="mt-6 text-sm animate__animated animate__fadeIn animate__delay-2s">
          {`Redirecting you to the sign-in page in ${time} seconds...`}
        </p>
      </div>
    </div>
  );
};

export default Myorders;
