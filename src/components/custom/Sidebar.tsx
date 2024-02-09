import { IoAddCircleOutline } from "react-icons/io5";
import IconButton from "./IconButton";

export default function Sidebar() {
  return (
    <div className="w-1/5 bg-slate-700">
      <div className="p-4">
        {/* Section 1 */}
        <IconButton
          icon={<IoAddCircleOutline className="w-6 h-6" />}
          text="Crear formulario"
          className="bg-slate-800 hover:bg-slate-900 text-slate-50"
        />
        {/* Section 2 */}
        <div className="mb-4">
          <p className="text-lg font-semibold">Mis formularios</p>
        </div>
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar..."
            className="border border-gray-300 px-4 py-2 w-full"
          />
        </div>
        {/* Logout Button */}
        <div>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
