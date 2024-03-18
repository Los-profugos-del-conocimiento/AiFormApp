import CreateForm from "@/components/createForm/createForm";

export const metadata = {
  title: "Nuevo Formulario",
  description: "Pagina de nuevo formulario",
};

export default function HomePage() {
  // const cookieStore = cookies();
  // const token = cookieStore.get('aiform_token_420');

  return (
    <div className="flex justify-center w-">
      <div className="max-w-[80vw] p-4 ">
        <h1 className="text-2xl lg:text-6xl font-bold mb-4 text-slate-800">
          Crear un nuevo formulario
        </h1>
        <p className="text-slate-100 mb-4">
          Ingresa un prompt y selecciona las opciones que desees para crear un
          nuevo formulario
        </p>
        <CreateForm />
      </div>
    </div>
  );
}
