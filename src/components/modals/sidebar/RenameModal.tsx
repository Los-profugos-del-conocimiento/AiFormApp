import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CiLogout } from "react-icons/ci";

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onRename: (newTitle: string) => void;
}

const RenameModal = ({
  isOpen,
  onClose,
  title,
  onRename,
}: RenameModalProps) => {
  const [newTitle, setNewTitle] = useState(title);

  const handleSubmit = () => {
    onRename(newTitle);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${
        isOpen ? "fixed inset-0 z-50" : "hidden"
      } bg-gray-900 bg-opacity-50`}
    >
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-400 rounded-md p-8 shadow-lg">
        <div className="absolute top-1 right-2">
          <Button onClick={onClose} variant="ghost" className="m-0 p-0">
            <IoMdClose size={24} className="text-gray-500" />
          </Button>
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 my-4">
          <Label htmlFor="text">Nuevo Nombre</Label>
          <Input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-[90%] mx-auto h-7 border-0 bg-slate-400 placeholder:text-slate-700 border-b border-slate-300 text-slate-700 rounded-none "
            style={{ outline: "none", boxShadow: "none" }}
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button
            className="bg-slate-400 w-fit mb-4 mx-0 p-1 hover:bg-slate-300"
            onClick={handleSubmit}
          >
            <CiLogout size={26} className="px-0 mr-3" /> Renombrar
          </Button>
          <Button onClick={onClose} className="underline ">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;
