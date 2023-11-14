'use client';

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import Container from "../components/Container";
import Heading from "../components/Heading";

import { SafeReservation, SafeUser } from "../types"
import AccountCard from "../components/listings/AccountCard";
import { BiSolidUser } from "react-icons/bi";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser | null;
}

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback(( id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation cancelled');
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error)
        })
        .finally(() => {
            setDeletingId('');
        })
    }, [router]);

  return (
    <Container>
      <div className="flex mb-10 gap-2 text-darkgray xs:text-thirtysix sm:text-fiftysix md:text-sixty lg:text-seventyeight">
        <BiSolidUser className="w-7 h-7 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 lg:w-30 lg:h-30 " />

        <Heading title="Account" />
      </div>

      <div className="bg-darkgray">
        <div className="ml-5 text-white p-2 font-bold text-mobile-twentyfour lg:text-thirtysix">
          Bookings
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {reservations.map((reservation) => (
          <AccountCard data={reservation.listing} reservation={reservation} />
          // <ListingCard
          //     key={reservation.id}
          //     data={reservation.listing}
          //     reservation={reservation}
          //     actionId={reservation.id}
          //     onAction={onCancel}
          //     disabled={deletingId === reservation.id}
          //     actionLabel="Cancel reservation"
          //     currentUser={currentUser}
          // />
        ))}
      </div>
    </Container>
  );
}

export default TripsClient