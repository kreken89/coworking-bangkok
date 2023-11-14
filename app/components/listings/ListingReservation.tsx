'use client';

import { Range } from 'react-date-range';

import Calendar from '../inputs/Calendar';
import Button from '../Button';
import useConfirmationModal from '@/app/hooks/useConfirmationModal';

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled: boolean;
    disabledDates: Date[];
}

const ListingReservation = ({ 
    price, 
    dateRange, 
    totalPrice, 
    onChangeDate, 
    onSubmit, 
    disabled, 
    disabledDates 
}: ListingReservationProps) => {

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
    <div
      className="
        bg-white
        rounded-tr-2xl
        rounded-bl-2xl
        border-[1px]
        border-neutral-200
        overflow-hidden
        ">
      <Calendar 
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
    </div>
  );
}

export default ListingReservation