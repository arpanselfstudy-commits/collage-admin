import './form.css';
import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface SelectOption {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'textarea' | 'date' | 'select';
  rows?: number;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  register: UseFormRegisterReturn;
  error?: string;
  onInput?: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  options?: SelectOption[];
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  className = 'form-group mb-5',
  required = false,
  disabled = false,
  readOnly = false,
  register,
  error,
  onInput,
  rows = 4,
  options = [],
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const renderField = () => {
    if (type === 'password') {
      return (
        <div className="relative">
          <input
            id={name}
            type={showPassword ? 'text' : 'password'}
            {...register}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onInput={onInput}
            className="form-control w-full p-2 border rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
      );
    } else if (type === 'textarea') {
      return (
        <textarea
          id={name}
          {...register}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          onInput={onInput}
          rows={rows}
          className="form-control w-full p-2 border rounded"
        />
      );
    } else if (type === 'select') {
      return (
        <select
          id={name}
          {...register}
          disabled={disabled}
          className="form-control w-full"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          id={name}
          type={type}
          {...register}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          onInput={onInput}
          className="form-control w-full p-2 border rounded"
        />
      );
    }
  };

  return (
    <div className={className}>
      <label htmlFor={name} className="block font-semibold mb-1 label-colr">
        {label} {required && <span className="mandatory-icon">*</span>}
      </label>
      {renderField()}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default FormField;
