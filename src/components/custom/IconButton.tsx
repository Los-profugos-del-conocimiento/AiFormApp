import React from "react";
import { Button } from "../ui/button";

interface IconButtonProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, text, className }) => {
  return (
    <Button
      className={` flex items-center justify-center gap-2 font-bold py-2 px-4 rounded ${className} `}
    >
      {icon}
      <span>{text}</span>
    </Button>
  );
};

export default IconButton;
