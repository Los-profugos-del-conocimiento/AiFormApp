"use client";
import Link from 'next/link';
import { HiDotsVertical } from 'react-icons/hi';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MdOutlineQuiz } from "react-icons/md";
import { RiSurveyLine } from "react-icons/ri";

interface SidebarFormCardProps {
  id: string;
  title: string;
  type: string;
}

const SidebarFormCard: React.FC<SidebarFormCardProps> = ({ id, title, type }) => {
  const truncatedTitle = title.length > 20 ? `${title.substring(0, 20)}...` : title;
  
  // Define the icon based on the type
  let IconComponent;
  if (type === 'Quiz') {
    IconComponent = MdOutlineQuiz;
  } else if (type === 'Survey') {
    IconComponent = RiSurveyLine;
  } else {
    // Default icon if type is neither 'Quiz' nor 'Survey'
    IconComponent = null;
  }

  return (
    <Link href={`/myForms/${id}`} passHref>
      <div className="flex items-center justify-between bg-slate-700 px-4 py-2 rounded-md hover:bg-slate-500 cursor-pointer">
        {IconComponent && <IconComponent size={20} className="text-gray-400 mr-2" />} {/* Render the icon */}
        <h3 className="text-base font-medium text-start text-slate-200 truncate">{truncatedTitle}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <HiDotsVertical size={20} className="text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuItem>Renombrar</DropdownMenuItem>
            <DropdownMenuItem>Compartir</DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
};

export default SidebarFormCard;