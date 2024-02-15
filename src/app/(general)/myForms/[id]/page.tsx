interface FormByIdPageProps {
    id: string;
  }
  
  const FormByIdPage = ({ id }: FormByIdPageProps) => {
    return (
      <div className="p-4">
        <h2>Estás en el formulario con ID: {id}</h2>
      </div>
    );
  };
  
  export default FormByIdPage;