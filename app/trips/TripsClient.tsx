'use client';

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import Container from "../components/Container";
import Heading from "../components/Heading";

import { SafeReservation, SafeUser } from "../types"
import AccountCard from "../components/listings/AccountCard";
import ListingCard from "../components/listings/ListingCard";

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
      <Heading title="Account" />
      <div className="bg-gray-800 text-white p-2">Booking</div>
      <div
        className="
                flex
                flex-col
                gap-8
                
        ">
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