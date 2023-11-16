
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useCheckoutModal from "@/app/hooks/useCheckoutModal";
import ListingReservation from "../listings/ListingReservation";
import { differenceInCalendarDays } from "date-fns";
import { Range } from "react-date-range";
import { SafeListing, SafeUser } from "@/app/types";
import BookingModal from "./BookingModal";
import { FaCcMastercard, FaCcPaypal, FaCcVisa } from "react-icons/fa";
import { AiFillCreditCard } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import ListingHead from "../listings/ListingHead";
import ListingInfo from "../listings/ListingInfo";
import { categories } from "../navbar/Categories";
import ReservationButton from "../ReservationButton";
import Email from "../Email";


const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface CheckoutModalProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  price?: number;
}

const CheckoutModal = ({
  listing,
  currentUser,
}: CheckoutModalProps) => {

  const { isOpen, onClose } = useCheckoutModal();
  
  // const modalRef = useRef(null);
  const router = useRouter();
  const loginModal = useLoginModal();

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [totalPrice, setTotalPrice] = useState(100); // Example base price
  const [disabledDates, setDisabledDates] = useState([]); // You would get this from props or context
  const [isLoading, setIsLoading] = useState(false);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      onClose();
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })

      .then(() => {
        toast.success("Reservation created successfully");
        setDateRange(initialDateRange);
        //redirect to accounts
        router.push("/trips");
        onClose();
      })

      .catch(() => {
        toast.error("Reservation failed");
      });
  }, [totalPrice, dateRange, listing?.id, router, loginModal, currentUser]);

  // Replicate date change effect
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
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

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <BookingModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onClose}
      body={
        <div className="flex flex-col md:flex-row overflow-y-auto">
          {/* Left side */}
          <div className="md:w-1/2 flex justify-between flex-col order-last md:order-first">
            <div>
              <div className="mxs:text-thirtysix mobile:text-fortyeight lg:text-fortyeight flex justify-center font-bold leading-none">
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
              <div className=" text-darkgray mxs:text-twenty mobile:text-twentyfour font-bold flex justify-center gap-2 mt-8">
                <p>Choose Payment Method</p>
                <AiFillCreditCard size={30} />
              </div>

              <div className="flex gap-24 justify-center mt-2">
                <div className="widerIcon">
                  <FaCcPaypal size={50} style={{ color: '#FFC703' }} />
                </div>
                <div className="flex widerIcon">
                  <div>
                    <FaCcVisa size={50} style={{ color: '#375BDB' }} />
                  </div>
                  <div>
                    <FaCcMastercard size={50} style={{ color: '#D34121' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="w-full md:w-1/2 flex flex-col space-y-4 px-4 order-first md:order-last">
            <div>
              <div>
                <ListingHead
                  title={listing.title}
                  imageSrc={[listing.imageSrc[0]]}
                  locationValue={listing.locationValue}
                  id={listing.id}
                  currentUser={currentUser}
                  
                />
                <div className="text-xl">
                  <ListingInfo
                    title={listing.title}
                    user={listing.user}
                    category={category}
                    locationValue={listing.locationValue}
                  />
                </div>
              </div>
              <div className="order-first sm:order-last md:order-last">
                <ReservationButton
                  totalPrice={totalPrice}
                  disabled={isLoading}
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

