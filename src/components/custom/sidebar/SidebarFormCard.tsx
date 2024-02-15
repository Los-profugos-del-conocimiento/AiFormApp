import Link from 'next/link';
import { MdDeleteOutline } from 'react-icons/md';

interface SidebarFormCardProps {
  id: string;
  title: string;
}

const SidebarFormCard = ({ id, title }: SidebarFormCardProps) => {
  const truncatedTitle =
    title.length > 20 ? `${title.substring(0, 20)}...` : title;

  return (
    <Link href={`/myForms/${id}`} passHref>
      <div
        className="flex items-center justify-between w-[80%] mx-auto my-4 bg-green-100 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer"
      >
        <h3 className="text-base font-medium text-gray-700 truncate">{truncatedTitle}</h3>
        <MdDeleteOutline size={20} className="text-gray-400 cursor-default" />
      </div>
    </Link>
  );
};

export default SidebarFormCard;