import React, { useRef } from 'react';
import Modal from './Modal';
import useOutsideClick from '@/app/hooks/useOutsideClick';
import { useRouter } from 'next/navigation';
import useCheckoutModal from '@/app/hooks/useCheckoutModal';
import useConfirmationModal from '@/app/hooks/useConfirmationModal';
import BookingModal from './BookingModal';

const CheckoutModal = () => {
  const { isOpen, onClose } = useCheckoutModal();

  const modalRef = useRef(null);
  const router = useRouter();

  useOutsideClick(modalRef, () => {
    if (isOpen) {
      onClose();
    }
  });

  if (!isOpen) return null;

  return (
    // <Modal
    //   isOpen={isOpen}
    //   onClose={onClose}
    //   onSubmit={onClose}
    //   actionLabel="CheckoutModal Booking BTN"
    //   body={
    //     <div className="flex">
    //       <div className="w-1/2 border-[1px]">
    //         <div
    //           className="text-center text-seventyeight font-bold p-20 cursor-pointer"
    //           >
    //           <h1>Choose dates</h1>
    //         </div>
    //       </div>

    //       <div className="w-1/2 border-[1px]">
    //           <button onClick={() => router.push('/trips')} className='border-[1px]'>Nästa sida</button>
    //       </div>
    //     </div>
    //   }
    // />
    <BookingModal 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onClose}
      body={
        <div className="flex">
          <div className="w-1/2 border-[1px]">
            <div
              className="text-center text-seventyeight font-bold p-20 cursor-pointer"
              >
              <h1>Choose dates</h1>
            </div>
          </div>

          <div className="w-1/2 border-[1px]">
              <button onClick={() => router.push('/trips')} className='border-[1px]'>Nästa sida</button>
          </div>
        </div>
      }
    />
  );
};
export default CheckoutModal;
