import React, { useEffect, useState } from "react";
import { IoAlertCircleOutline, IoCheckmarkSharp, IoCloseOutline } from "react-icons/io5";

interface AlertBoxProps {
  type: "error" | "success";
  message: string;
}

const AlertBox = ({ type, message }: AlertBoxProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setShouldRender(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for the fade-out animation to complete before removing the component
      setTimeout(() => setShouldRender(false), 500); // Adjust this to match the duration of the fade-out
    }, 5000);
    return () => clearTimeout(timer);
  }, [message, type]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 500); // Adjust this to match the duration of the fade-out
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed top-5 right-5 transition-opacity duration-500 max-w-[80vw] ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${type === "error" ? "bg-red-400" : "bg-green-400"}
      text-white p-4 rounded-md shadow-lg flex items-center space-x-4`}
      style={{ transition: "opacity 0.5s ease" }}
    >
      {type === "error" ? (
        <IoAlertCircleOutline size={24} />
      ) : (
        <IoCheckmarkSharp size={24} />
      )}
      <span className="flex-grow">{message}</span>
      <IoCloseOutline className="cursor-pointer" size={24} onClick={handleClose} />
    </div>
  );
};

export default AlertBox;