'use client';

import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface inputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors
}

const Input = ({ id, label, type, disabled, formatPrice, required, register, errors }: inputProps) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <div className='absolute top-7 left-2'>
          <span>THB</span>
        </div>
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
        peer
        w-full
        p-4
        pt-6
        font-light
        bg-white
        border-2
        rounded-tr-2xl
        rounded-bl-2xl
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${formatPrice ? 'pl-12' : 'pl-4'}
        ${errors[id] ? 'border-red-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-red-500' : 'focus:border-black'}
        `}
      />
      <label
        className={`
      absolute
      text-md
      duration-150
      transform
      -translate-y-3
      top-5
      z-10
      origin-[0]
      ${formatPrice ? 'left-12' : 'left-4'}
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4
      ${errors[id] ? 'text-red-500' : 'text-zinc-500'}
      `}
      >        
        {label}
        {required && <span className="text-rose-500"></span>}
        
      </label>
    </div>
  );
}

export default Input