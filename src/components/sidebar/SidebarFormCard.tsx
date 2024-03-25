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

import DeleteFormModal from "@/components/modals/sidebar/DeleteFormModal";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import RenameModal from "@/components/modals/sidebar/RenameModal";

interface SidebarFormCardProps {
  id: string;
  title: string;
  type: string;
  handleCloseSidebarMobile?: () => void;
}

const SidebarFormCard = ({
  id,
  title: initialTitle,
  type,
  handleCloseSidebarMobile,
}: SidebarFormCardProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const handleRename = (newTitle: string) => {
    setTitle(newTitle);
    // You can also add your logic here to update the title in your backend/database
  };

  // Function to revert to original title on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsTitleEditable(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef]);

  useEffect(() => {
    // Effect for focusing and setting cursor at the end when editable
    if (isTitleEditable && inputRef.current) {
      const inputElement = inputRef.current;
      // Focus on the input element
      inputElement.focus();
      // Ensure the cursor is at the end of the input
      const val = inputElement.value;
      inputElement.value = "";
      inputElement.value = val;
    }
  }, [isTitleEditable]);

  // Handler to toggle title editability
  // Modify handleToggleEdit to handle responsiveness
const handleToggleEdit = () => {
  // Check if window is defined and screen width is less than the md breakpoint
  if (window.innerWidth < 768) {
    setIsRenameModalOpen(true);
  } else {
    setIsTitleEditable(true);
  }
};

  const handleTitleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Updated title:", (e.target as HTMLInputElement).value);
      setIsTitleEditable(false);
    }
  };

  // Define the icon based on the type
  let IconComponent;
  if (type === "quiz") {
    IconComponent = MdOutlineQuiz;
  } else if (type === "survey") {
    IconComponent = RiSurveyLine;
  } else {
    // Default icon if type is neither 'Quiz' nor 'Survey'
    IconComponent = null;
  }

  return (
    <>
      <div className="w-full flex flex-row" ref={containerRef}>
        <Link
          href={`/myForms/${id}`}
          passHref
          style={{ display: "inline-block" }}
          onClick={handleCloseSidebarMobile}
        >
          <div className="flex items-center bg-slate-700 w-[40vw] md:w-full px-4 py-2 rounded-md hover:bg-slate-500 cursor-pointer">
            {/* Render the icon */}
            {IconComponent && (
              <IconComponent size={20} className="text-gray-400 mr-2" />
            )}{" "}
            {/* Editable Title  */}
            {isTitleEditable ? (
              // <input
              //   ref={inputRef}
              //   type="text"
              //   value={title}
              //   onChange={(e) => setTitle(e.target.value)}
              //   onKeyDown={handleTitleChange}
              //   className="text-base font-medium text-start w-full text-slate-200 bg-slate-600 border-none rounded-md"
              //   autoFocus
              // />
              <Input
              type="text"
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleTitleChange}
              className="text-base font-medium text-start w-full text-slate-200 bg-slate-600 border-none rounded-md"
              style={{ outline: "none", boxShadow: "none" }}
              autoFocus
            />
            ) : (
              <h3 className="text-base font-medium text-start w-full text-slate-200 truncate">
                {title}
              </h3>
            )}
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HiDotsVertical color="white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" bg-slate-800 border-black">
            <DropdownMenuItem
              className="text-slate-300 focus:bg-slate-500 focus:text-slate-300"
              onClick={handleToggleEdit}
            >
              <MdDriveFileRenameOutline size={23} className="mr-1" />
              Renombrar
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 focus:bg-slate-500 focus:text-slate-300">
              <IoMdShareAlt size={23} className="mr-1" />
              Compartir
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 focus:bg-slate-500 focus:text-red-500"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <MdDelete size={23} className="mr-1" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DeleteFormModal
        title={title}
        isOpen={isDeleteModalOpen}
        id = {id}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      <RenameModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        title={title}
        onRename={handleRename}
      />
    </>
  );
};

export default SidebarFormCard;
