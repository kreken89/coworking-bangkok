import React from 'react';
import Button from '@/app/components/Button';
import Pricing from '@/app/components/Pricing';
import Ratings from '@/app/components/Ratings';
import ConfirmationModal from '@/app/components/modals/ConfirmationModal';
import CheckoutModal from '@/app/components/modals/CheckoutModal';
import useCheckoutModal from '@/app/hooks/useCheckoutModal';
import { SafeListing, SafeUser } from '@/app/types';

interface ListingClientRightProps {
  currentUser?: any;
  listing: SafeListing & {
    user: SafeUser;
  };
}

const ListingClientRight = ({
  currentUser,
  listing }: ListingClientRightProps) => {

  const { isOpen, onOpen } = useCheckoutModal();

  return (
    <div>
      <Pricing />
      <Button label="Book now!" onClick={onOpen} />
      {isOpen && (
        <CheckoutModal
          listing={listing}
          currentUser={currentUser}
          
        />
      )}
      {isOpen && <ConfirmationModal />}
      <Ratings />
    </div>
  );
};
export default ListingClientRight;
