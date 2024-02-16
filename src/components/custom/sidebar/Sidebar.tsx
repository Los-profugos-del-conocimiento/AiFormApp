"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import aiLogo from "@/app/images/aiLogo.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsEmojiSunglasses } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import SidebarFormCard from "./SidebarFormCard";
import { Input } from "@/components/ui/input";

import { useMediaQuery } from "react-responsive";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

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
    {
      id: "quiz-6",
      title: "Science Challenge",
      type: "Quiz",
    },
    {
      id: "quiz-7",
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
        } p flex flex-col gap-6 h-full `}
      >
        <Image src={aiLogo} alt="AI Logo"></Image>
        <div className="flex flex-row justify-between p-2">
          <Button
            asChild
            className=" w-[50%]  bg-slate-700 hover:bg-slate-500 p-0"
          >
            <div className="flex justify-start ">
              <IoIosAddCircleOutline size={24} />
              <Link href="/home">New Form</Link>
            </div>
          </Button>
          <Button
            asChild
            className=" w-[50%]  bg-slate-700 hover:bg-slate-500 p-0"
          >
            <div className="flex items-start ">
              <BsEmojiSunglasses size={24} />
              <Link href="/myForms">My forms</Link>
            </div>
          </Button>
        </div>

        <Input
          type="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder=" Busca por nombre"
          className="w-[90%] mx-auto h-7 border-0 bg-slate-700 placeholder:text-slate-300 border-b border-slate-300 text-slate-100 rounded-none checked:border-0"
        />
        <div className="w-[90%] mx-auto h-[50vh] overflow-y-auto pr-3">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <SidebarFormCard key={item.id} {...item} />
            ))
          ) : (
            <span className="text-gray-400 text-sm mt-4">No results found</span>
          )}
        </div>

        <DropdownMenu >
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          className=" w-[50%]  bg-slate-700 hover:bg-slate-500 p-0"
        >
            <CiLogout size={24} />
            Cerrar sesión
        </Button>
      </div>
      {/* Menu Icon */}
      <div className="absolute top-2 left-2 ">
        <button onClick={toggleSidebar}>
          <IoIosMenu size={30} className="text-2xl z-10" />
        </button>
        {/* <Button asChild className=" bg-aiBlue-200 w-fit p-1">
          <div className="">
            <IoIosAddCircleOutline size={24} className="px-0" />
            <Link href="/home"></Link>
          </div>
        </Button> */}
      </div>
    </div>
  );
};

export default Sidebar;
