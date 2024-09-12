"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import QuestionCard from "@/components/formByIdPage/QuestionCard";

interface FormItem {
  id: string;
  question: string;
  answerType: string;
  answers: {
    id: string;
    text: string;
  }[];
}

interface FormData {
  id: string;
  title: string;
  type: string;
  prompt: string;
  items: FormItem[];
}

interface FormByIdPageProps {
  params: {
    id: string;
  };
}

const FormByIdPage = ({ params }: FormByIdPageProps) => {
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/form/${params.id}`,
          { withCredentials: true }
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  if (!formData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-4 bg-slate-500 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-100">{formData.title}</h1>
        {/* Mostrar la cantidad de preguntas */}
        <span className="text-slate-300">{formData.items.length} preguntas</span>
      </div>
      <p className="text-lg text-slate-300 mb-4">Tipo: {formData.type}</p>
      <p className="text-md text-slate-200 mb-6">{formData.prompt}</p>

      {/* Mapeamos los items del formulario para mostrar las preguntas */}
      {formData.items.map((item, index) => (
        <QuestionCard
          key={item.id}
          questionNumber={index + 1}
          questionText={item.question}
          answerType={item.answerType}
          answers={item.answers}
          formType={formData.type}
        />
      ))}
    </div>
  );
};

export default FormByIdPage;
