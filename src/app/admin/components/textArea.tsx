
import React from 'react';

interface InputAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ label, name, value, onChange }) => {
  return (
    <div className='mb-5'>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className='p-2 shadow-md w-full mt-1'
        rows={5}
      />
    </div>
  );
};

export default InputArea;
