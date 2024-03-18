"use client"
import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TextareaWithCounterProps {
  label: string;
  placeholder: string;
  maxCharacters: number;
  className?: string;
}

export default function TextareaWithCounter ({ label, placeholder, maxCharacters, className }: TextareaWithCounterProps) {
  const [text, setText] = useState('');
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxCharacters) {
      setText(e.target.value);
    }
  };

  const characterCount = text.length;

  return (
    <div className= {`w-full grid ${className}`} >
      <Label className="text-slate-800 mb-2">{label}</Label>
      <Textarea
        className=" w-full bg-slate-500 border-b-200  rounded-lg placeholder:text-slate-300 text-slate-100 focus:bg-slate-600"
        style={{ outline: "none", boxShadow: "none" }}
        placeholder={placeholder}
        id="message"
        value={text}
        onChange={handleTextChange}
      />
      <div className="text-right text-sm">
        {characterCount}/{maxCharacters} characters
      </div>
    </div>
  );
};