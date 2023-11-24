'use client';

import { signIn } from 'next-auth/react';
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
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEye } from 'react-icons/io5';

const LoginModal = () => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Login success');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        if (callback.error !== 'Callback') {
          toast.error(callback.error);
        }
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Login" subtitle="Login to your account!" center />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
      <div
        className="
          justify-center 
          flex 
          flex-col 
          sm:flex-row
          items-center 
          gap-2
          text-twenty
          font-poppins
          ">
        <div>Dont have an account yet?</div>
        <div
          onClick={toggle}
          className="
            text-neutral-800 
            cursor-pointer 
            hover:underline
            ">
          Register here
        </div>
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Login with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Login with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
        text-neutral-500
        text-center
        mt-4
        font-light
        "></div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
