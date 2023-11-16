'use client';

import useConfirmationModal from "../hooks/useConfirmationModal";
import Button from "./Button";

interface ReservationButtonProps {
  totalPrice: number;
  disabled: boolean;
  onSubmit: () => void;
}


const ReservationButton = ({ totalPrice, disabled, onSubmit }: ReservationButtonProps) => {

    const { isOpen, onOpen, onClose } = useConfirmationModal();

    const handleButtonClick = () => {
      // Open the confirmation modal
      onOpen();

      // Call the onSubmit function after a delay (you can adjust the delay as needed)
      setTimeout(() => {
        onSubmit();
        onClose();
      }, 3000); // Example delay of 500 milliseconds
    };

  return (
    <>
      <div
        className="
        flex 
        flex-row
        items-center 
        justify-between
        p-4
        font-semibold
        text-lg
      ">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
      <div className="p-4">
        <Button
          disabled={disabled}
          label="Book now"
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
}

export default ReservationButton