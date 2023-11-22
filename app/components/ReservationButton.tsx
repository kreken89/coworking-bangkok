'use client';

import { useRouter } from "next/navigation";
import useConfirmationModal from "../hooks/useConfirmationModal";
import Button from "./Button";
import useLoginModal from "../hooks/useLoginModal";
import useCheckoutModal from "../hooks/useCheckoutModal";

interface ReservationButtonProps {
  totalPrice: number;
  disabled: boolean;
  onSubmit: () => void;
  currentUser: any;
}


const ReservationButton = ({
  totalPrice,
  disabled,
  onSubmit,
  currentUser,
}: ReservationButtonProps) => {
  const { isOpen, onOpen, onClose } = useConfirmationModal();
  const loginModal = useLoginModal();
  const checkoutModal = useCheckoutModal();

  const handleButtonClick = () => {
    // Check if the user is logged in
    if (currentUser) {
      
      // Open the confirmation modal
      onOpen();

      // Call the onSubmit function after a delay (you can adjust the delay as needed)
      setTimeout(() => {
        onSubmit();
        onClose();
      }, 3000);
    } else {
      checkoutModal.onClose();
      
      setTimeout(() => {
        loginModal.onOpen();
      }, 300);
    }
  };

  
  return (
    <>
      <div
        className="
        flex 
        flex-row
        items-center 
        justify-between
        py-2
        font-semibold
        text-lg
        font-poppins
      ">
        <div>Total</div>
        <div>{totalPrice} THB</div>
      </div>
      <div className="">
        <Button
          disabled={disabled}
          label="Book now"
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
};

export default ReservationButton;