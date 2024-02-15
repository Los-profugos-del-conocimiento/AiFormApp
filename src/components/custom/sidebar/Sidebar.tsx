"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import aiLogo from "@/app/images/aiLogo.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsEmojiSunglasses } from "react-icons/bs";


import { useMediaQuery } from "react-responsive";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`${
        isSidebarOpen ? " md:w-[20vw] w-[70vw] " : "w-0 lg:w-12"
      } lg:block bg-slate-700  relative`}
    >
      {/* Sidebar */}

      <div
        className={`${isSidebarOpen ? "block " : ""} p flex flex-col gap-6 `}
      >
        <Image src={aiLogo} alt="AI Logo"></Image>
        <Button asChild className=" bg-aiBlue-200 w-[60%] mx-auto">
          <div className="flex justify-start gap-3">
            <IoIosAddCircleOutline size={24} />
            <Link href="/home">{ isSidebarOpen ? "New Form" : ""}</Link>
          </div>
        </Button>
        <Button asChild className=" bg-aiBlue-200 w-[60%] mx-auto">
          <div className="flex items-start gap-3">
            <BsEmojiSunglasses size={24} />
            <Link href="/myForms">View my forms</Link>
          </div>
        </Button>
      </div>
      {/* Menu Icon */}
      <div className="absolute top-2 left-2 ">
        <button onClick={toggleSidebar}>
          <IoIosMenu className="text-2xl z-10" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
