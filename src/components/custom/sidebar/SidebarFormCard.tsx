"use client";
import Link from 'next/link';
import { HiDotsVertical } from 'react-icons/hi';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'; 
interface SidebarFormCardProps {
  id: string;
  title: string;
}

const SidebarFormCard: React.FC<SidebarFormCardProps> = ({ id, title }) => {
  const truncatedTitle = title.length > 20 ? `${title.substring(0, 20)}...` : title;

  return (
    <Link href={`/myForms/${id}`} passHref>
      <div
        className="flex items-center justify-between my-4 bg-green-100 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer"
      >
        <h3 className="text-base font-medium text-gray-700 truncate">{truncatedTitle}</h3>
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