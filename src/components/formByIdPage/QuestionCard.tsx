import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Answer {
  id: string;
  text: string;
}

interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
  answerType: string;
  answers: Answer[];
  formType: string; // "quiz" o "survey"
}

const QuestionCard = ({
  questionNumber,
  questionText,
  answerType,
  answers,
  formType,
}: QuestionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [selectedDropdown, setSelectedDropdown] = useState<string | null>(null);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckboxChange = (answerId: string) => {
    if (selectedCheckboxes.includes(answerId)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((id) => id !== answerId));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, answerId]);
    }
  };

  const renderAnswers = () => {
    switch (answerType) {
      case "radio":
        return answers.map((answer) => (
          <div key={answer.id} className="flex items-center space-x-2 mb-2">
            <Checkbox
              checked={selectedRadio === answer.id}
              onCheckedChange={() => setSelectedRadio(answer.id)}
            />
            <label className="text-slate-300">{answer.text}</label>
          </div>
        ));
      case "checkbox":
        return answers.map((answer) => (
          <div key={answer.id} className="flex items-center space-x-2 mb-2">
            <Checkbox
              checked={selectedCheckboxes.includes(answer.id)}
              onCheckedChange={() => handleCheckboxChange(answer.id)}
            />
            <label className="text-slate-300">{answer.text}</label>
          </div>
        ));
      case "drop_down":
        return (
          <Select onValueChange={setSelectedDropdown}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {answers.map((answer) => (
                <SelectItem key={answer.id} value={answer.id}>
                  {answer.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "text":
        return answers.map((answer) => (
          <Textarea
            key={answer.id}
            value={answer.text}
            readOnly
            className="mb-2 w-full bg-slate-600 text-slate-300"
          />
        ));
      case "date":
      case "time":
        return answers.map((answer) => (
          <input
            key={answer.id}
            type="text"
            value={answer.text}
            readOnly
            className="w-full p-2 bg-slate-600 text-slate-300 mb-2"
          />
        ));
      default:
        return <p className="text-slate-300">Tipo de respuesta no soportado.</p>;
    }
  };

  return (
    <div className="bg-slate-600 p-4 rounded-lg mb-4">
      {/* Título de la pregunta */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleCollapse}
      >
        <div className="flex items-center">
          <span className="text-slate-200 font-bold mr-4">
            {questionNumber}.
          </span>
          <span className="text-slate-100">{questionText}</span>
        </div>
        <div>
          {isExpanded ? (
            <IoIosArrowUp size={24} className="text-slate-100" />
          ) : (
            <IoIosArrowDown size={24} className="text-slate-100" />
          )}
        </div>
      </div>

      {/* Contenido colapsable */}
      {isExpanded && (
        <div className="mt-4 p-4 bg-slate-700 rounded-lg text-slate-300">
          {renderAnswers()}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
