"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import aiLogo from "@/app/images/aiLogo.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiListOl } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import SidebarFormCard from "./SidebarFormCard";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "react-responsive";
import LogoutModal from "@/components/modals/sidebar/LogoutModal";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebarMobile = () => {
    if (isMobile) {
      // Close the sidebar on mobile
      setIsSidebarOpen(false);
    }
  }

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
    <>
      <div
        className={`${
          isSidebarOpen ? " w-[100vw] md:w-[30vw] lg:w-[20vw] " : "w-0 lg:w-12"
        } lg:block bg-slate-700  relative `}
      >
        {/* Sidebar */}

        <div
          className={`${
            isSidebarOpen ? "block " : "hidden"
          } p flex flex-col h-full p-4 `}
        >
          <Image
            src={aiLogo}
            alt="AiForm Logo"
            className="w-[80%] h-[7vh] ml-auto"
          />
          <div className="flex flex-row justify-between h-fit mt-4">
            <Button
              asChild
              className=" w-fit  bg-slate-700 hover:bg-slate-500 p-2"
              onClick={handleCloseSidebarMobile}
            >
              <div className="flex justify-start ">
                <IoIosAddCircleOutline size={24} />
                <Link href="/home">Crear</Link>
              </div>
            </Button>
            <Button
              asChild
              className=" w-fit  bg-slate-700 hover:bg-slate-500 p-2"
              onClick={handleCloseSidebarMobile}
            >
              <div className="flex items-start ">
                <BiListOl size={28} />
                <Link href="/myForms">Mis formularios</Link>
              </div>
            </Button>
          </div>
          <div className="w-[100%] mx-auto flex flex-row bg-slate-700">
            <Input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              placeholder=" Busca por nombre"
              className="w-[90%] mx-auto h-7 border-0 bg-slate-700 placeholder-text-slate-300 border-b border-slate-300 text-slate-100 rounded-none "
              style={{ outline: "none", boxShadow: "none" }}
            />
            <Button
              className="m-0 -ml-4 p-0 bg-slate-700 border-b-300 hover:bg-slate-700 text-red-600 border-b border-slate-300  h-7 rounded-none"
              onClick={() => setSearchTerm("")}
            >
              {searchTerm && "X"}
            </Button>
          </div>
          <div className="w-[100%] mx-auto h-full overflow-y-auto pr-3 mt-4">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <SidebarFormCard key={item.id} {...item} handleCloseSidebarMobile={handleCloseSidebarMobile} />
              ))
            ) : (
              <span className="text-gray-400 text-sm mt-4">
                No results found
              </span>
            )}
          </div>
          <Button
            className=" w-fit  bg-slate-700 hover:bg-slate-500 p-0"
            onClick={() => setIsLogoutModalOpen(true)}
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
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};

export default Sidebar;
