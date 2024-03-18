"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextareaWithCounter from "../custom/TextAreaWithCounter";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { Button } from "../ui/button";
import { IoCreate } from "react-icons/io5";
import { CreateForm } from "@/interfaces/IForm";
export default function CreateForm() {

  interface Option {
    [key: string]: boolean;
  }

  const options: { [key: string]: string } = {
    radio: "Radio",
    checkbox: "Checkbox",
    drop_down: "Drop Down",
    text: "Text",
    scale: "Scale",
    date: "Date",
    time: "Time",
  };

  const [enabledDificulty, setEnabledDificulty] = useState(false);

  const [typeOptions, setTypeOptions] = useState<Option>({});

  const handleCheckboxChange = (optionKey: string) => {
    setTypeOptions((prev) => ({
      ...prev,
      [optionKey]: !prev[optionKey],
    }));
  };

  return (
    <div className="w-full flex flex-col">
      <div className="grid w-full items-center gap-2 mt-4 ">
        <Label className="text-slate-800">Título para el formulario</Label>
        <Input
          type="text"
          placeholder="Título"
          className=" w-full bg-slate-500 border-b-200  rounded-lg placeholder:text-slate-300 text-slate-100 focus:bg-slate-600 "
          style={{ outline: "none", boxShadow: "none" }}
        />
      <TextareaWithCounter
        label="Prompt"
        placeholder="Prompt"
        maxCharacters={100}
        className="mt-4"
      />
      </div>
      <div className="w-full flex flex-col mt-8 gap-4  rounded-xl shadow-lg p-4">
      <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-6 items-center">
        <div className="flex flex-row w-full lg:w-1/2 gap-3 items-center">
          <Label className="text-slate-800">Tipo:</Label>
          <Select 
          >
            <SelectTrigger
              className="bg-slate-500 border-b-200  rounded-lg placeholder:text-slate-300 text-slate-100 focus:bg-slate-600"
              style={{ outline: "none", boxShadow: "none" }}
            >
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className=" bg-slate-700">
              <SelectGroup>
                <SelectLabel>Options</SelectLabel>
                <SelectItem value="quiz">Examen</SelectItem>
                <SelectItem value="survey">Encuesta</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row w-full lg:w-1/2 gap-3 items-center">
          <Label className="text-slate-800">Cantidad de preguntas: </Label>
          <Input
            type="number"
            placeholder="0"
            className=" w-1/3 bg-slate-500 border-b-200 border-t-0 border-x-0 rounded-none placeholder:text-slate-200 text-slate-100 "
            style={{ outline: "none", boxShadow: "none" }}
          />
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-6 ">
        <div className="flex flex-col w-full lg:w-1/2 gap-3">
          <Label className="text-slate-800">
            Elige los tipos de preguntas para tu formulario
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(options).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={typeOptions[key]}
                  onCheckedChange={() => handleCheckboxChange(key)}
                />
                <Label
                  htmlFor={key}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row w-full lg:w-1/2 gap-3">
          <div className="flex gap-2">
            <Label className="text-slate-800">Dificultad:</Label>
            <Checkbox
              id="enable-difficulty"
              checked={enabledDificulty}
              onCheckedChange={() => setEnabledDificulty(!enabledDificulty)}
            />
          </div>
          {enabledDificulty && (
            <Slider
              defaultValue={[3]}
              min={1}
              max={5}
              step={1}
              className="w-[60%] items-start mt-1"
            />
          )}
        </div>
      </div>
      
      <Button
        className=" w-[10rem] bg-blue-800 hover:bg-blue-600 p-2 mx-auto "
        onClick={() => {}}
      >
        <IoCreate size={24} className="mr-1" />
        Crear
      </Button>
    </div>
    </div>
  );
}
