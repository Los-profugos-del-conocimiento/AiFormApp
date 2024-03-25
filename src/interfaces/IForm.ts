import CreateForm from '../components/createForm/createForm';
export interface IForm {
  id: string;
  type: string;
  title: string;
  prompt: string;
  questions: number;
  answerTypes: AnswerType[];
  difficulty: number;
  googleFormsUrl?: any;
  items: FormItem[];
}

export interface ICreateForm{
  type: string;
  title?: string;
  prompt: string;
  questions: number;
  answerTypes?: AnswerType[];
  difficulty?: number;
}

enum AnswerType {
  radio = "radio",
  checkbox = "checkbox",
  drop_down = "drop_down",
  text = "text",
  scale = "scale",
  date = "date",
  time = "time",
  // file = 'file',
  // row = 'row'
}

interface FormItem {
  id: string;
  itemId?: any;
  question: string;
  description?: any;
  answerType: AnswerType;
  answers: FormAnswer[];
}

interface FormAnswer {
  id: string;
  answerId?: any;
  text: string;
  correct: boolean;
}
