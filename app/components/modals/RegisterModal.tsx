'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEye } from 'react-icons/io5';

const RegisterModal = () => {
    const registerModal = useRegisterModal();

    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    
    const regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)[A-Za-z\d]{6,}$/;
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FieldValues>({
      defaultValues: {
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
      },
    });

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const handleToggleRepeatPassword = () => {
      setShowRepeatPassword(!showRepeatPassword);
    };
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);
      
      // Validate email
      if (!regEx.test(data.email)) {
        toast.error('Invalid email, Use: x@x.xx');
        setIsLoading(false);
        return;
      }

      // Validate password
      if (!passwordRegEx.test(data.password)) {
        const errorMessage = 'Password needs to contain at least 6 letters, at least 1 uppercase and at least 2 numbers'
        setPasswordError(errorMessage);
        toast.error('Password do not match requirements');
        setIsLoading(false);
        return;
      } else {
        setPasswordError('');
      }

      // Check if the password and repeatPassword match
      if (data.password !== data.repeatPassword) {
        toast.error('Passwords do not match');
        setIsLoading(false);
        return;
      }

      // If passwords match, proceed with registration
      axios
        .post('/api/register', data)
        .then(() => {
          toast.success('Registration success, please login.');
          registerModal.onClose();
          loginModal.onOpen();
        }) 
        .catch((error) => {
          toast.error('Something went wrong, try another email');
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    const toggle = useCallback(() => {
      registerModal.onClose();
      loginModal.onOpen();
    }, [registerModal, loginModal]);

    const bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading title="Register" subtitle="Create an account" center />
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        {/* <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        /> */}

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            {showPassword ? <FaRegEyeSlash size={24} /> : <IoEye size={24} />}
          </button>
        </div>

        <div className="relative">
          <Input
            id="repeatPassword"
            type={showRepeatPassword ? 'text' : 'password'}
            label="Repeat Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <button
            type="button"
            onClick={handleToggleRepeatPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
            {showRepeatPassword ? <FaRegEyeSlash size={24} /> : <IoEye size={24} />}
          </button>
          {/* <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              onChange={handleTogglePassword}
              checked={showPassword}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="showPassword">Show Password</label>
          </div> */}
        </div>
        <div className="text-red">{passwordError}</div>
      </div>
    );
    
    const footerContent = (
      <div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button
          outline
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => signIn('google')}
        />
        <Button
          outline
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => signIn('github')}
        />
        <div
          className="
        text-neutral-500
        text-center
        mt-4
        font-light
        ">
          <div
            className="
          justify-center 
          flex 
          flex-row 
          items-center 
          gap-2
          ">
            <div>Already have an account?</div>
            <div
              onClick={toggle}
              className="
            text-neutral-800 
            cursor-pointer 
            hover:underline
            ">
              Log in
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal