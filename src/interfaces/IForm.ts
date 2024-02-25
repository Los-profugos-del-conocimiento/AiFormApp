export interface Form {
  id: string;
  type: string;
  title: string;
  prompt: string;
  questions: number;
  answerTypes: string[];
  difficulty: number;
  googleFormsUrl?: any;
  items: FormItem[];
}

interface FormItem {
  id: string;
  itemId?: any;
  question: string;
  description?: any;
  answerType: string;
  answers: FormAnswer[];
}

interface FormAnswer {
  id: string;
  answerId?: any;
  text: string;
  correct: boolean;
}
