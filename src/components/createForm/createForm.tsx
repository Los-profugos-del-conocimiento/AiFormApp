"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextareaWithCounter from "../custom/TextAreaWithCounter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoCreate } from "react-icons/io5";
import { ICreateForm } from "@/interfaces/IForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import axios from "axios";

interface Option {
  [key: string]: boolean;
}

const AnswerType = z.enum([
  "radio",
  "checkbox",
  "drop_down",
  "text",
  "scale",
  "date",
  "time",
]);

const options = [
  {
    id: "radio",
    label: "Radio",
  },
  {
    id: "checkbox",
    label: "Checkbox",
  },
  {
    id: "drop_down",
    label: "Drop Down",
  },
  {
    id: "text",
    label: "Text",
  },
  {
    id: "scale",
    label: "Scale",
  },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "time",
    label: "Time",
  },
] as const;

const difficultyOptions = [
  { value: "1", label: "Muy fácil" },
  { value: "2", label: "Fácil" },
  { value: "3", label: "Normal" },
  { value: "4", label: "Difícil" },
  { value: "5", label: "Muy difícil" },
];

export default function CreateForm() {
  const [enabledDificulty, setEnabledDificulty] = useState(false);
  const [typeOptions, setTypeOptions] = useState<Option>({});
  const [prompt, setPrompt] = useState("");
  const maxCharacters = 100;
  const maxQuestions = 10;

  const CreateFormSchema = z.object({
    type: z.string({
      required_error: "Este campo es obligatorio",
    }),
    title: z.string().optional(),
    prompt: z.string({
      required_error: "Este campo es obligatorio",
    }),
    questions: z
      .number()
      .positive({
        message: `Se deben ingresar valores mayores a 0, el límite es ${maxQuestions}`,
      })
      .optional(),
    answerTypes: z.array(AnswerType).optional(),
    difficulty: z.number().optional(),
  });

  const handleCheckboxChange = (optionKey: string) => {
    setTypeOptions((prev) => ({
      ...prev,
      [optionKey]: !prev[optionKey],
    }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxCharacters) {
      setPrompt(e.target.value);
    }
  };

  const characterCount = prompt.length;

  const form = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      title: "", // Ensure this default is set to avoid the controlled/uncontrolled warning
      answerTypes: [],
      questions: 0,
      difficulty: undefined,
      // You can add default values for other optional fields if needed
    },
  });

  // Watch for changes in enabledDifficulty and update form values accordingly
  useEffect(() => {
    if (enabledDificulty) {
      // Optionally set a default difficulty value when enabled
      form.setValue("difficulty", 3, { shouldValidate: true });
    } else {
      // Reset difficulty to undefined or null when not enabled
      form.setValue("difficulty", undefined);
    }
  }, [enabledDificulty, form]);

  const onSubmit = async (values: z.infer<typeof CreateFormSchema>) => {
    try {
      // Perform the POST request with Axios
      const response = await axios.post("http://localhost:4200/form", values, {
        withCredentials: true,
      });
      console.log(response.data);
      // Handle response here, e.g., showing a success message to the user
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error: ", error.response?.data);
        // Handle Axios error here, e.g., showing an error message to the user
      } else {
        console.error("Unexpected error: ", error);
        // Handle unexpected errors here
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid w-full items-center gap-2 mt-3 ">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <span className="text-slate-800">
                  Título para el formulario
                </span>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Título"
                    className=" w-full bg-slate-500 border-b-200  rounded-lg placeholder:text-slate-300 text-slate-100 focus:bg-slate-600 "
                    style={{ outline: "none", boxShadow: "none" }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Controller
            control={form.control}
            name="prompt"
            rules={{ required: true }} // If you want to make it required
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormItem>
                <span className="text-slate-800 mb-2">
                  Instrucciones para el formulario
                </span>
                <FormControl>
                  <Textarea
                    className="w-full bg-slate-500 border-b-200 rounded-lg placeholder:text-slate-300 text-slate-100 focus:bg-slate-600"
                    style={{ outline: "none", boxShadow: "none" }}
                    placeholder="Ingresa las instrucciones para la creación de tu formulario"
                    value={value}
                    onChange={(e) => {
                      const text = e.target.value;
                      if (text.length <= maxCharacters) {
                        onChange(text); // Only update the value if within the character limit
                      }
                    }}
                  />
                </FormControl>
                <div className="text-right text-sm">
                  {value?.length || 0}/{maxCharacters} characters
                </div>
                {error && <FormMessage>{error.message}</FormMessage>}
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col mt-8 gap-4  rounded-xl shadow-lg p-4">
          <div className="w-full flex flex-col md:flex-row md:justify-between gap-6 items-center">
            <div className="flex flex-row w-full md:w-1/2 gap-3 items-center">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className=" flex flex-row items-center gap-4">
                    <span className="text-slate-800">Tipo:</span>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="bg-slate-500 border-b-200  rounded-lg placeholder:text-slate-300 text-slate-100 focus:bg-slate-600"
                          style={{ outline: "none", boxShadow: "none" }}
                        >
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className=" bg-slate-700">
                        <SelectGroup>
                          <SelectLabel>Options</SelectLabel>
                          <SelectItem value="quiz">Examen</SelectItem>
                          <SelectItem value="survey">Encuesta</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row w-full md:w-1/2 gap-3 items-center">
              <FormField
                control={form.control}
                name="questions"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-4">
                    <span className="text-slate-800">
                      Cantidad de preguntas:
                    </span>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="w-1/3 bg-slate-500 border-b-200 border-t-0 border-x-0 rounded-none placeholder:text-slate-200 text-slate-100"
                        style={{ outline: "none", boxShadow: "none" }}
                        {...field}
                        {...form.register("questions", {
                          setValueAs: (value) => {
                            const parsed = parseInt(value, 10);
                            if (
                              !isNaN(parsed) &&
                              parsed > 0 &&
                              parsed <= maxQuestions
                            ) {
                              return parsed;
                            }

                            return 0;
                          }
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row md:justify-between gap-6 ">
            <div className="flex flex-col w-full md:w-1/2 gap-3">
              <FormField
                control={form.control}
                name="answerTypes"
                render={() => (
                  <FormItem>
                    <span className="text-slate-800">
                      Elige los tipos de preguntas para tu formulario
                    </span>
                    <div className="grid grid-cols-2 md:grid-cols-3  gap-2 items-center">
                      {options.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="answerTypes"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex items-center space-x-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value!,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <span className="text-sm font-normal">
                                  {item.label}
                                </span>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row w-full md:w-1/2 gap-3 items-center">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-4">
                    <span className="text-slate-800">Dificultad:</span>
                    <Controller
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger
                              className="bg-slate-500 border-b-200 rounded-lg text-slate-100 focus:bg-slate-600"
                              style={{ outline: "none", boxShadow: "none" }}
                            >
                              <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-700">
                            {difficultyOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            className=" w-[10rem] bg-blue-800 hover:bg-blue-600 p-2 mx-auto "
            onClick={() => {}}
            type="submit"
          >
            <IoCreate size={24} className="mr-1" />
            Crear
          </Button>
        </div>
      </form>
    </Form>
  );
}
