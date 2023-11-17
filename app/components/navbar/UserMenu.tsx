'use client';

import { useRouter } from 'next/navigation';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useEffect, useState, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';
import { BiSolidUser } from 'react-icons/bi';

import MenuItem from './MenuItem';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import { SafeUser } from '@/app/types';
import useOutsideClick from '@/app/hooks/useOutsideClick';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  currentUser;

  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(wrapperRef, () => {
    setIsOpen(false);
  });

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const handleCloseOnClick = (path: string) => {
    setIsOpen(false);
    router.push(path);
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex flex-row items-center gap-3">
        {/* <div
          onClick={onRent}
          className="
            bg-white
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
            ">
          Add listing
        </div> */}

        {/* <div
          //   onClick={toggleOpen}
          className="
          bg-lightestGray
            p-4
            md_py-1
            md_px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          ">
          <AiOutlineMenu className="react-icon-computer" />
        </div> */}

        <div
          onClick={toggleOpen}
          className={
            currentUser
              ? 'cursor-pointer'
              : `
                bg-lightestGray
                p-4
                md_py-1
                md_px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
            `
          }>
          {currentUser ? (
            // Render the Avatar with the user's image if currentUser exists (i.e., user is logged in)
            // Removed the "hidden md:block" class to make the avatar always visible
            <Avatar src={currentUser.image} />
          ) : (
            // Render the default user icon if currentUser is null or undefined (i.e., user is logged out)
            <BiSolidUser className="react-icon-computer" />
          )}
        </div>
        {currentUser ? (
          <div
            onClick={() => signOut()}
            className="
                  bg-lightestGray
                  p-4
                  md_py-1
                  md_px-2
                  border-[1px]
                  border-neutral-200
                  flex
                  flex-row
                  items-center
                  rounded-full
                  cursor-pointer
                  hover:shadow-md
                  transition
                  ">
            <FiLogOut className="react-icon-computer" />
          </div>
        ) : null}
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-48
            
            bg-white
            overflow-hidden
            right-0
            text-sm
            ">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => handleCloseOnClick('/trips')}
                  label="My Account"
                />
                <MenuItem
                  onClick={() => handleCloseOnClick('/favorites')}
                  label="My Favorites"
                />
                <MenuItem
                  onClick={() => handleCloseOnClick('/reservations')}
                  label="My Reservations"
                />
                <MenuItem
                  onClick={() => handleCloseOnClick('/properties')}
                  label="My Properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="Add Office" />
                {/* <MenuItem onClick={() => signOut()} label="Logout" /> */}
                {/* <MenuItem onClick={() => {}} label="Account" /> */}
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                {/* <MenuItem onClick={() => {}} label="Account" /> */}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
