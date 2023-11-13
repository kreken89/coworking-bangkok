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
    }, 8000); // Example delay of 500 milliseconds
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
      <div
        className="
            flex flex-row items-center gap-1 p-4
        ">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar 
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className='p-4'>
        <Button 
            disabled={disabled}
            label="Book now"
            onClick={handleButtonClick}
        />
      </div>
      <div className='
        flex 
        flex-row
        items-center 
        justify-between
        p-4
        font-semibold
        text-lg
      '>
        <div>
            Total
        </div>
        <div>
            $ {totalPrice}
        </div>

      </div>
    </div>
  );
}

export default ListingReservation