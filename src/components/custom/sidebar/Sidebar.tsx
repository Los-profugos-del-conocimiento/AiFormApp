"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import aiLogo from "@/app/images/aiLogo.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsEmojiSunglasses } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import SidebarFormCard from "./SidebarFormCard";
import { Input } from "@/components/ui/input";

import { useMediaQuery } from "react-responsive";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const mockData = [
    {
      id: "quiz-1",
      title: "Ultimate Programming Trivia",
      type: "Quiz",
    },
    {
      id: "survey-2",
      title: "Customer Satisfaction Survey",
      type: "Survey",
    },
    {
      id: "quiz-3",
      title: "History Through the Ages",
      type: "Quiz",
    },
    {
      id: "survey-4",
      title: "Movie Preferences Survey",
      type: "Survey",
    },
    {
      id: "quiz-5",
      title: "Science Challenge",
      type: "Quiz",
    },
  ];

  useEffect(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const filteredItems = mockData.filter((item) => {
      const normalizedTitle = item.title.toLowerCase();
      return normalizedTitle.includes(normalizedSearchTerm);
    });
    setFilteredData(filteredItems);
  }, [searchTerm]);

  return (
    <div
      className={`${
        isSidebarOpen ? " md:w-[20vw] w-[70vw] " : "w-0 lg:w-12"
      } lg:block bg-slate-700  relative`}
    >
      {/* Sidebar */}

      <div
        className={`${
          isSidebarOpen ? "block " : "hidden"
        } p flex flex-col gap-6 `}
      >
        <Image src={aiLogo} alt="AI Logo"></Image>
        <Button asChild className=" bg-aiBlue-200 w-[60%] mx-auto">
          <div className="flex justify-start gap-3">
            <IoIosAddCircleOutline size={24} />
            <Link href="/home">{isSidebarOpen ? "New Form" : ""}</Link>
          </div>
        </Button>
        <Button asChild className=" bg-aiBlue-200 w-[60%] mx-auto">
          <div className="flex items-start gap-3">
            <BsEmojiSunglasses size={24} />
            <Link href="/myForms">View my forms</Link>
          </div>
        </Button>

        <div>
          <Input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <SidebarFormCard key={item.id} {...item} />
            ))
          ) : (
            <span className="text-gray-400 text-sm mt-4">No results found</span>
          )}
        </div>

        <Button asChild className=" bg-aiBlue-200 w-[40%] mr-auto mx-4 mt-auto">
          <div className="flex items-start gap-3">
            <CiLogout size={24} />
            <Link href="/myForms">Logout</Link>
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
