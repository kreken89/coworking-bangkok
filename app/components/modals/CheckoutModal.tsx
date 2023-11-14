
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
        <div className="flex px-10 ">
          <div className="border-[1px]flex">
            <div className="text-seventyeight flex justify-center font-bold">
              <h1>Choose dates</h1>
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
            <div className=" text-3xl font-bold flex justify-center gap-2 mt-8 ">
              <p>Choose Payment Method</p>
              <div className="">
                <AiFillCreditCard size={30} />
              </div>
            </div>
            <div className="flex gap-24 justify-center mt-2">
              <div className="widerIcon">
                <FaCcPaypal size={80} style={{ color: '#FFC703' }} />
              </div>
              <div className="flex widerIcon">
                <div>
                  <FaCcVisa size={80} style={{ color: '#375BDB' }} />
                </div>
                <div>
                  <FaCcMastercard size={80} style={{ color: '#D34121' }} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
            />

            <ListingInfo
              title={listing.title}
              user={listing.user}
              category={category}
              description={listing.description}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      }
    />
  );
};
export default CheckoutModal;