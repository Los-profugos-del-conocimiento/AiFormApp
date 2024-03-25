"use client";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

interface DeleteFormModalProps {
  isOpen: boolean;
  title: string;
  id: string;
  onClose: () => void;
}

const DeleteFormModal = ({ isOpen, onClose, title, id }: DeleteFormModalProps) => {

  const handleConfirmDelete = async () => {
    console.log("Id: ", id);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/form/${id}`, {
        withCredentials: true,
      });
      
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

 

  if (!isOpen) return null;


  return (
    <div className={`${isOpen ? 'fixed inset-0 z-10' : 'hidden'} bg-gray-900 bg-opacity-50`}>
      <div className={`${isOpen ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'hidden'} bg-slate-300 rounded-md p-8 shadow-md`}>
        <div className="absolute top-1 right-2 ">
          <Button onClick={onClose} variant={"ghost"} className="m-0 p-0">
            <IoMdClose size={24} className="text-red-500" />
          </Button>
        </div>
        <h3 className="mb-4">¿Estás seguro de eliminar el formulario &quot;{title}&quot;?</h3>
        <div className="flex flex-col md:flex-row justify-between gap-4 px-4 mt-4 md:justify-end">
          <Button onClick={handleConfirmDelete} variant={"ghost"} className="bg-red-500 hover:bg-red-700 text-white">
            Sí, Eliminar
          </Button>
          <Button onClick={onClose} variant={"ghost"} className="underline hover:bg-slate-300">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFormModal;
