import { redirect } from "next/navigation";
export const metadata = {
  title: 'Nuevo Formulario',
  description: 'Pagina de nuevo formulario',
 };

export default async function HomePage() {

  return (
    <div className="flex justify-center  h-screen">
      <div className="max-w-[80vw] p-10">
        <h1 className="text-2xl lg:text-6xl font-bold mb-4 text-slate-200">Crear un nuevo formulario</h1>
        <p className="text-slate-300 mb-4">
          Ingresa un prompt y selecciona las opciones que desees para crear un nuevo formulario
        </p>
        <div className="overflow-y-auto max-h-80">
        </div>
      </div>
    </div>
  );
}
