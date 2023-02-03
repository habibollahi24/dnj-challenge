import React from "react";

interface InputProps {
   placeholder: string;
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   inputRef: React.RefObject<HTMLInputElement>;
}

const InputField = ({ placeholder, value, onChange, inputRef }: InputProps) => {
   return (
      <input
         type="text"
         placeholder={placeholder}
         className="input-field"
         value={value}
         onChange={onChange}
         ref={inputRef}
      />
   );
};

export default InputField;
