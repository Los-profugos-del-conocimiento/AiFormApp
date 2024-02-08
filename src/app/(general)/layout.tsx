import React from "react";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-slate-700">
        <div className="p-4">
          {/* Section 1 */}
          <div className="mb-4">
            <button
              className="flex select-none items-center gap-3 rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                ></path>
              </svg>
              Add to Bookmark
            </button>
          </div>
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
      {/* Main Content */}
      <div className="flex-grow bg-white p-4">{children}</div>
    </div>
  );
};

export default Sidebar;
