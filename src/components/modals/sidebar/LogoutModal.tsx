import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const LogoutModal = ({ isOpen, onClose }: SidebarProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`${isOpen ? 'fixed inset-0 z-10' : 'hidden'} bg-gray-900 bg-opacity-50`}
    >
      <div
        className={`${isOpen ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'hidden'} bg-slate-300 rounded-md p-8 shadow-md`}
      >
        <div className="absolute top-1 right-2 ">
          <Button onClick={onClose} variant={"ghost"} className=" m-0 p-0 ">
            <IoMdClose size={24} className="text-red-500" />
          </Button>
        </div>
        <h3 className="mb-4">¿Estás seguro de cerrar sesión?</h3>
        <div className="flex flex-col md:flex-row justify-between gap-4 px-4 mt-4 ">
        <Button onClick={onClose} variant={"ghost"} className=" bg-red-500 hover:bg-red-00">
            Sí, Cerrar sesión
          </Button>
          <Button onClick={onClose} variant={"ghost"} className=" underline hover:bg-slate-300">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
