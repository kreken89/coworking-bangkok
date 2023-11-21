import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useCheckoutModal from '@/app/hooks/useCheckoutModal';
import ListingReservation from '../listings/ListingReservation';
import { differenceInCalendarDays } from 'date-fns';
import { Range } from 'react-date-range';
import { SafeListing, SafeUser } from '@/app/types';
import BookingModal from './BookingModal';
import { FaCcMastercard, FaCcPaypal, FaCcVisa } from 'react-icons/fa';
import { AiFillCreditCard } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import ListingHead from '../listings/ListingHead';
import ListingInfo from '../listings/ListingInfo';
import { categories } from '../navbar/Categories';
import ReservationButton from '../ReservationButton';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface CheckoutModalProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  price?: number;
}

const CheckoutModal = ({ listing, currentUser }: CheckoutModalProps) => {
  const { isOpen, onClose } = useCheckoutModal();

  // const modalRef = useRef(null);
  const router = useRouter();
  const loginModal = useLoginModal();

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const [totalPrice, setTotalPrice] = useState(100); // Example base price
  const [disabledDates, setDisabledDates] = useState([]); // You would get this from props or context
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState< string | null >(null);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      onClose();
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })

      .then(() => {
        toast.success('Reservation created successfully');
        setDateRange(initialDateRange);
        //redirect to accounts
        router.push('/trips');
        onClose();
      })

      .catch(() => {
        toast.error('Reservation failed');
      });
  }, [totalPrice, dateRange, listing?.id, router, loginModal, currentUser]);

  // Replicate date change effect
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      let discountPercentage = 0;

      // Apply discount based on the number of days
      if (dayCount >= 7 && dayCount < 28) {
        discountPercentage = 10;
      } else if (dayCount >= 28) {
        discountPercentage = 25;
      }

      // Calculate the total price with the discount
      let discountedPrice = listing.price;

      if (dayCount && listing.price) {
        discountedPrice = dayCount * listing.price;
        discountedPrice = discountedPrice * ((100 - discountPercentage) / 100);

        discountedPrice = Math.ceil(discountedPrice);
      }

      setTotalPrice(discountedPrice);
    }
  }, [dateRange, listing.price]);

  // Handle reservation submission
  const handleReservationSubmit = () => {
    setIsLoading(true);
    // Make API call to create reservation
    // Then close modal
  };

  // Close modal and clear state
  const handleModalClose = () => {
    onClose();
    // Optionally reset state
  };

  const categoriesForListing = useMemo(() => {
    return categories.filter((item) => listing.category.includes(item.label));
  }, [listing.category]);

  return (
    <BookingModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onClose}
      body={
        <div className="flex flex-col gap-4 md:flex-row overflow-y-auto">
          {/* Left side */}
          <div className="md:w-1/2 flex justify-between flex-col order-last md:order-first">
            <div>
              <div className="text-thirtysix md:text-fortyeight lg:text-fortyeight flex justify-center font-bold leading-none">
                <h1 className="text-darkgray mb-10">Choose dates</h1>
              </div>
              <ListingReservation
                price={listing.price} // Replace with actual price per night
                dateRange={dateRange}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>

            <div>
              <div className=" text-darkgray text-twentyfour lg:text-thirtysix font-bold flex items-center justify-center gap-2 mt-8">
                <p>Choose Payment Method</p>
                <AiFillCreditCard size={30} />
              </div>

              <div className="flex gap-24 justify-center mt-2 cursor-pointer">
                <div
                  className={`widerIcon ${
                    selectedPaymentMethod === 'paypal' &&
                    'border-2 border-greenBtn px-1 rounded-md'
                  }`}>
                  <FaCcPaypal
                    size={50}
                    className={`text-paypalyellow`}
                    onClick={() =>
                      setSelectedPaymentMethod(
                        selectedPaymentMethod === 'paypal' ? null : 'paypal'
                      )
                    }
                  />
                </div>

                <div
                  className={`flex widerIcon ${
                    selectedPaymentMethod === 'visa-mastercard' &&
                    'border-2 border-greenBtn px-1 rounded-md'
                  } cursor-pointer`}
                  onClick={() =>
                    setSelectedPaymentMethod(
                      selectedPaymentMethod === 'visa-mastercard'
                        ? null
                        : 'visa-mastercard'
                    )
                  }>
                  <div className="flex ">
                    <FaCcVisa size={50} className={`text-visablue`} />
                    <FaCcMastercard
                      size={50}
                      className={`text-mastercardred`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="w-full md:w-1/2 flex flex-col px-4 order-first md:order-last">
            <div>
              <ListingHead
                imageSrc={[listing.imageSrc[0]]}
                locationValue={listing.locationValue}
                id={listing.id}
                currentUser={currentUser}
              />
            </div>

            <div className="flex flex-col justify-between">
              <ListingInfo
                title={listing.title}
                user={listing.user}
                categories={categoriesForListing}
                locationValue={listing.locationValue}
              />

              <div className="order-first mxs:order-last xs:order-last sm:order-last md:order-last">
                <ReservationButton
                  totalPrice={totalPrice}
                  disabled={!selectedPaymentMethod || isLoading}
                  onSubmit={onCreateReservation}
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};
export default CheckoutModal;