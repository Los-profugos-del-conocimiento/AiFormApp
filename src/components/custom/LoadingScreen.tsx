export const LoadingScreen = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-500 w-full">
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-slate-700 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-blue-400 rounded-full animate-spin-slow"></div>
      </div>
      <p className="text-slate-300 mt-4 text-lg font-semibold">
        Cargando...
      </p>
    </div>
  </div>
  );
};
