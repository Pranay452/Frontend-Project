import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { date_DD_MMM_YYYY_HH_MM } from "../Utils/Helper";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { signOut } from "../Redux/User/UserSlice";
import { useNavigate } from "react-router-dom";

interface Order {
  _id: string;
  // Define other properties of the Order based on your Order schema
  orderId: string;
  amount: number;
  status: string;
  createdAt: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const { authToken, setAuthToken } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchOrders = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/getallorder?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("response", response);
      if (response?.data?.status === "SUCCESS") {
        setOrders(response?.data?.combinedResults);
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        Cookies.remove("accessToken");
        setAuthToken(undefined);
        localStorage.removeItem("email");
        dispatch(signOut());
        navigate("/signin");
        return;
      }
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  console.log("orders", orders);

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-20 p-4">
      <div className="w-full   shadow-lg rounded-lg overflow-hidden">
        <div className=" mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            All Orders List
          </h1>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders?.map((order: any, index: any) => {
                  console.log("🚀 ~ {orders?.map ~ order:", order);
                  return (
                    <div
                      key={order._id}
                      className="border p-4 rounded shadow-lg "
                    >
                      <h2 className="font-bold text-lg mb-2">
                        Order ID: {order?.orderId}
                      </h2>

                      <img src={order?.orderDetails?.image} alt="img" />
                      <p>Email : {order?.orderDetails?.address?.email}</p>
                      <p>
                        Frame :{" "}
                        {order?.orderDetails?.addFrame === false ? "No" : "Yes"}
                      </p>
                      <p>Name : {order?.orderDetails?.address?.name}</p>
                      <p>Mobile: {order?.orderDetails?.address?.mobile}</p>
                      <p>Flat: {order?.orderDetails?.address?.flat}</p>
                      <p>Landmark: {order?.orderDetails?.address?.landmark}</p>
                      <p>Locality : {order?.orderDetails?.address?.locality}</p>
                      <p>City: {order?.orderDetails?.address?.city}</p>
                      <p>State: {order?.orderDetails?.address?.state}</p>
                      <p>Country: {order?.orderDetails?.address?.city}</p>
                      <p>Payment: {order?.paymentDetails?.paymentId}</p>
                      <p>Amount: {order?.paymentDetails?.amount}</p>
                      <p>Payment Email: {order?.paymentDetails?.email}</p>
                      <p>Payment Order ID: {order?.paymentDetails?.orderId}</p>
                      <p>
                        Created At:
                        {date_DD_MMM_YYYY_HH_MM(
                          order?.orderDetails?.createdAt
                        ) || "-"}
                      </p>
                      <p>
                        Estimated Date:{" "}
                        {date_DD_MMM_YYYY_HH_MM(
                          order?.orderDetails?.estimatedTime
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-center space-x-2">
                {page > 1 && (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>
                )}
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
