import "animate.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import GIF from "../assets/bf6.gif";
import { AuthContext } from "../Provider/AuthProvider";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const onPressHome = () => {
    onClose();
    navigate("/");
  };

  const onPressOrders = () => {
    onClose();
    navigate(isAuthenticated ? "/myorders" : "/signup");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg shadow-lg p-8 text-center animate__animated animate__bounceIn">
        <img
          src={GIF}
          alt="Success"
          className="w-24 h-24 mx-auto mb-4 animate__animated animate__tada"
        />
        <h2 className="text-2xl font-bold mb-4 text-black">
          Order Placed Successfully!
        </h2>
        <p className="text-lg mb-2  text-black">
          Thank you for your order. Your pencil sketch is being processed.
        </p>
        {!isAuthenticated && (
          <p className="text-lg mb-6 text-black">Sign Up to Track your Order</p>
        )}
        <div className="flex items-center justify-between gap-4 mt-8">
          <button
            onClick={onPressOrders}
            className="bg-black text-white w-full font-bold py-4 px-4 rounded-lg animate__animated animate__fadeIn"
          >
            {isAuthenticated ? "My Orders" : "Sign Up"}
          </button>

          <button
            onClick={onPressHome}
            className="w-full text-black font-bold py-4 px-4 border-2 border-black rounded-lg animate__animated animate__fadeIn"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
