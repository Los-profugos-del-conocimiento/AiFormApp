"use client";
import Link from "next/link";
import { HiDotsVertical } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MdOutlineQuiz } from "react-icons/md";
import { RiSurveyLine } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

interface SidebarFormCardProps {
  id: string;
  title: string;
  type: string;
}

const SidebarFormCard = ({ id, title, type }: SidebarFormCardProps) => {

  // Define the icon based on the type
  let IconComponent;
  if (type === "Quiz") {
    IconComponent = MdOutlineQuiz;
  } else if (type === "Survey") {
    IconComponent = RiSurveyLine;
  } else {
    // Default icon if type is neither 'Quiz' nor 'Survey'
    IconComponent = null;
  }

  return (
    <div className="w-full flex flex-row">
      <Link href={`/myForms/${id}`} passHref style={{display: 'inline-block'}}>
        <div className="flex items-center bg-slate-700 w-[40vw] lg:w-[15vw] px-4 py-2 rounded-md hover:bg-slate-500 cursor-pointer">
          {IconComponent && (
            <IconComponent size={20} className="text-gray-400 mr-2" />
          )}{" "}
          {/* Render the icon */}
          <h3 className="text-base font-medium text-start w-full text-slate-200 truncate">
            {title}
          </h3>
        </div>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <HiDotsVertical color="white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" bg-slate-800 border-black">
          <DropdownMenuItem className="text-slate-300 focus:bg-slate-500 focus:text-slate-300">
            <MdDriveFileRenameOutline size={23} />
            Renombrar
          </DropdownMenuItem>
          <DropdownMenuItem className="text-slate-300 focus:bg-slate-500 focus:text-slate-300">
            <IoMdShareAlt size={23} />
            Compartir
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500 focus:bg-slate-500 focus:text-red-500 ">
            <MdDelete size={23} />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SidebarFormCard;
