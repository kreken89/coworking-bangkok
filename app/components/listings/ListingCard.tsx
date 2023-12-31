'use client';

import { useRouter } from 'next/navigation';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import useCountries from '@/app/hooks/useCountries';
import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import { IoLocationOutline } from 'react-icons/io5';
import Button from '../Button';
import { categories } from '../navbar/Categories';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}: ListingCardProps) => {
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

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
        col-span-1
        cursor-pointer
        group
        ">
      <div
        className="
        flex
        flex-col
        rounded-tr-4xl
        rounded-bl-4xl
        overflow-hidden
        h-full
        "
        style={{
          height: '600px',
        }}>
        <div
          className="
            h-full
            relative   
            ">
          {data.imageSrc.map((imageUrl, index) => (
            <Image
              key={index}
              fill
              src={imageUrl}
              alt={`Listing Image ${index + 1}`}
              sizes="(max-width: 640px) 100vw, 640px"
              className="object-cover transition group-hover:scale-110"
            />
          ))}

          <div className="absolute top-2 right-2">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
          <div
            style={{
              background:
                'linear-gradient(180deg, #FFFFFF 58.85%, rgba(255, 255, 255, 0.00) 100%)',
            }}
            className="absolute bottom-2 left-0 right-0 mx-2  rounded-tr-3xl rounded-bl-3xl p-3 bg-red-100">
            <div className="leading-none text-listingcardtitle font-rajdhani font-bold text-twenty mb-3 sm:text-twenty md:text-twenty lg:text-twentyfour">
              {data.title}
            </div>

            <div className=" flex flex-row gap-1 font-light text-gray mb-3 text-twenty sm:text-twenty md:text-twenty lg:text-twenty xl:text-twenty leading-none">
              <IoLocationOutline /> {location?.region}, {location?.label}
            </div>

            <div className="flex flex-wrap justify-start items-center gap-1">
              {data.category.map((item, index) => {
                // Find the category object in the categories array
                const categoryObject = categories.find(
                  (category) => category.label === item
                );
                // Check if the category object exists and has an icon
                if (categoryObject && categoryObject.icon) {
                  // Render the icon component
                  const IconComponent = categoryObject.icon;
                  return (
                    <span
                      key={item}
                      className="bg-white p-[2px] rounded-tr-lg rounded-bl-lg">
                      <IconComponent size={22} />
                    </span>
                  );
                } else {
                  return null; // Handle the case where the category is not found or doesn't have an icon
                }
              })}
            </div>

            <div className="flex flex-row items-center gap-1 bg-white p-1 rounded-tr-2xl rounded-bl-2xl w-3/5 justify-center ml-auto text-darkgray">
              <div className="font-poppins font-bold ">{price} THB</div>
              {!reservation && (
                <div className="font-poppins font-bold">/Week</div>
              )}
            </div>
          </div>
        </div>
        <div></div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
