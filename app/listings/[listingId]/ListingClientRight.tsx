import React from 'react';
import Button from '@/app/components/Button';
import Pricing from '@/app/components/Pricing';
import Ratings from '@/app/components/Ratings';
import ConfirmationModal from '@/app/components/modals/ConfirmationModal';
import CheckoutModal from '@/app/components/modals/CheckoutModal';
import useCheckoutModal from '@/app/hooks/useCheckoutModal';

const ListingClientRight = () => {
  const { isOpen, onOpen } = useCheckoutModal();
  

  return (
    <div>
      <Pricing />
      <Button label="Open Booking Modal" onClick={onOpen} />
      {isOpen && <CheckoutModal />}
      {isOpen && <ConfirmationModal />}
      <Ratings />
    </div>
  );
};
export default ListingClientRight;
