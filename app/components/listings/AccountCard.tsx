'use client';

import { useRouter } from 'next/navigation';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import useCountries from '@/app/hooks/useCountries';
import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';
import Heading from '../Heading';
import { BsFillPencilFill } from 'react-icons/bs';

interface AccountCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const AccountCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}: AccountCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="flex bg-white sm:p-6 md:p-6 lg:p-6 mobile:p-2 rounded-lg custom-shadow cursor-pointer hover:custom-shadow transition-shadow">
      <div
        className="
      aspect-square
      relative
      overflow-hidden
      rounded-tr-3xl
      rounded-bl-3xl
      mr-4
      w-1/3
      
    ">
        <Image
          fill
          alt="Listing"
          src={data.imageSrc}
          className="
        object-cover
        h-full
        w-full
        group-hover:scale-105
        transition
      "
        />
      </div>

      {/* Right column wth info */}
      <div className="flex flex-col justify-between flex-grow ">
        <div>
          <div className="flex flex-row justify-between">
            <h2 className="text-mobile sm:text-twenty md:text-thirtysix lg:text-fiftysix  font-bold text-gray-800 mb-2 ">
              {data.title}
            </h2>
            <div className="flex items-center space-x-2 text-gray-600 mb-20 "></div>
            <BsFillPencilFill className="w-4 h-4 sm:w-8 sm:h-8" />
            {/* Add more icons or actions here as needed */}
          </div>
          <hr />
          <p className="text-gray-600 mb-2 max-w-md hidden sm:block lg:text-twentyfour md:text-twenty">
            {data.description}
          </p>
        </div>
        <div className="flex justify-between items-center lg:text-twentyfour md:text-twenty mobile:text-custom-small ">
          <p className="text-black-500 font-bold mb-2">{reservationDate}</p>
          <span className="text-black-500 font-bold">{price} THB</span>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
