import React from "react";

interface InputProps {
   placeholder: string;
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ placeholder, value, onChange }: InputProps) => {
   return (
      <input
         type="text"
         placeholder={placeholder}
         className="input-field"
         value={value}
         onChange={onChange}
      />
   );
};

export default InputField;
