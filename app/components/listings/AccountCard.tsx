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
import { IoTrashBinOutline } from 'react-icons/io5';
import { FaRegTrashAlt } from 'react-icons/fa';

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

  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      router.push(`/listings/${data.id}/edit`);
    },
    [router, data.id, disabled]
  );

  // const handleCancel = useCallback(
  //   (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.stopPropagation();

  //     if (disabled) {
  //       return;
  //     }

  //     onAction?.(actionId);
  //   },
  //   [onAction, actionId, disabled]
  // );

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

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const idToDelete = reservation ? reservation.id : data.id;

    onAction?.(idToDelete);
  };

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="flex bg-white sm:p-6 md:p-6 lg:p-6 mxs:p-2 rounded-lg custom-shadow cursor-pointer transition-shadow">
      <div
        className="
          aspect-square
          relative
          overflow-hidden
          rounded-tr-3xl
          rounded-bl-3xl
          w-1/5
          mr-4
        ">
        <Image
          fill
          alt="Listing"
          sizes="(max-width: 640px) 100vw, 640px"
          src={data.imageSrc[0]}
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
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex flex-row justify-between">
          <h2 className="sm:text-twenty md:text-thirtysix lg:text-fortyeight leading-none font-bold font-poppins text-darkgray mb-2">
            {data.title}
          </h2>
          <div className="flex items-center space-x-2 mb-20"></div>

          {/* <button className="cursor-pointer" onClick={handleEdit}>
            <BsFillPencilFill className="w-5 h-5 sm:w-8 sm:h-8 hover:text-greenBtn" />
          </button> */}

          <button className="cursor-pointer" onClick={handleDelete}>
            <FaRegTrashAlt className="w-5 h-5 sm:w-8 sm:h-8 hover:text-red" />
          </button>
        </div>

        <div style={{ maxHeight: '150px', overflow: 'auto' }}>
          <p className="mb-2 max-w-md hidden md:block md:text-twenty lg:text-twentyfour ">
            {data.description}
          </p>
        </div>

        <div className="flex justify-between items-center lg:text-twentyfour md:text-twenty mxs:text-custom-small ">
          <p className="text-black-500 font-bold mb-2">{reservationDate}</p>
          <span className="text-black-500 font-bold">{price} THB</span>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
