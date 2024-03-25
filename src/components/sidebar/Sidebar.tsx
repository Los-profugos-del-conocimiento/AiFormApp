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

import { IForm } from "@/interfaces/IForm";
import useAxios from "@/hooks/useAxios";
import AlertBox from "../AlertBox";
import { redirect } from "next/navigation";
import useCheckUserSession from "@/hooks/useCheckUserSession";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebarMobile = () => {
    if (isMobile) {
      // Close the sidebar on mobile
      setIsSidebarOpen(false);
    }
  };

  const {
    data: formData,
    loading,
    error,
  } = useAxios<IForm>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/form`,
    method: "get",
    withCredentials: true,
  });
  

  useEffect(() => {
    if (formData !== null) {
      // Check if data is not null
      const normalizedSearchTerm = searchTerm.toLowerCase();
      const filteredItems = formData.filter((item: IForm) => {
        // Explicitly type 'item'
        const normalizedTitle = item.title.toLowerCase();
        return normalizedTitle.includes(normalizedSearchTerm);
      });
      setFilteredData(filteredItems);
    }
  }, [searchTerm, formData]);

  return (
    <>
      <div
        className={`${
          isSidebarOpen ? " w-[100vw] md:w-[34vw] lg:w-[20vw] " : "w-0 sm:w-12"
        } md:block bg-slate-700  relative `}
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
              <Link href="/home">
                <IoIosAddCircleOutline size={24} className="mr-1" />
                Crear
              </Link>
            </Button>
            <Button
              asChild
              className=" w-fit  bg-slate-700 hover:bg-slate-500 p-2"
              onClick={handleCloseSidebarMobile}
            >
              <Link href="/myForms">
                <BiListOl size={28} className="mr-1" />
                Mis formularios
              </Link>
            </Button>
          </div>
          <div className="w-[100%] mx-auto flex flex-row bg-slate-700">
            <Input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              placeholder=" Busca por nombre"
              className="w-[90%] mx-auto h-7 border-0 bg-slate-700 placeholder:text-slate-300 border-b border-slate-300 text-slate-100 rounded-none "
              style={{ outline: "none", boxShadow: "none" }}
            />
            <Button
              className="m-0 -ml-4 p-0 bg-slate-700 border-b-300 hover:bg-slate-700 text-red-600 border-b border-slate-300  h-7 rounded-none"
              onClick={() => setSearchTerm("")}
            >
              {searchTerm && "X"}
            </Button>
          </div>
          <div className="w-[100%] mx-auto h-full pr-3 mt-4">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <SidebarFormCard
                  key={item.id}
                  {...item}
                  handleCloseSidebarMobile={handleCloseSidebarMobile}
                />
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
            <CiLogout size={24} className="mr-2" />
            Cerrar sesión
          </Button>
        </div>
        {/* Menu Icon */}
        <div className="absolute top-2 left-2 h-[98vh] flex flex-col  ">
          <Button
            onClick={toggleSidebar}
            className={`p-0 m-0 w-fit ${
              isMobile ? "bg-slate-500" : "bg-slate-700"
            } ${isSidebarOpen && "bg-slate-700"} hover:bg-slate-500 text-black`}
          >
            <IoIosMenu size={30} className="text-2xl z-10" />
          </Button>
          {!isSidebarOpen && !isMobile && (
            <div className="flex flex-col justify-between h-screen mt-6">
              <div>
                <Button asChild className="bg-slate-700 w-fit p-1">
                  <Link href="/home">
                    <IoIosAddCircleOutline size={26} className="px-0" />
                  </Link>
                </Button>

                <Button asChild className=" bg-slate-700 w-fit p-1">
                  <Link href="/myForms">
                    <BiListOl size={26} className="px-0" />
                  </Link>
                </Button>
              </div>
              <Button
                className=" bg-slate-700 w-fit mb-4 mx-0 p-1"
                onClick={() => setIsLogoutModalOpen(true)}
              >
                <CiLogout size={26} className="px-0" />
              </Button>
            </div>
          )}
        </div>
      </div>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        signOut={() => {
          // redirect(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/logout`);
          window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/logout`;
        }}
      />
      {error && <AlertBox type="error" message={error} />}
    </>
  );
};

export default Sidebar;
