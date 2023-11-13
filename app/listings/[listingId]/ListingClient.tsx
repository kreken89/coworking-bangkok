'use client';
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { categories } from '@/app/components/navbar/Categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingReservation from '@/app/components/listings/ListingReservation';
import useLoginModal from '@/app/hooks/useLoginModal';
import dynamic from 'next/dynamic';
import useCountries from '@/app/hooks/useCountries';
import ListingClientRight from './ListingClientRight';
import ListingInfo from '@/app/components/listings/ListingInfo';

// const initialDateRange = {
//   startDate: new Date(),
//   endDate: new Date(),
//   key: 'selection',
// };

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  locationValue: string;
}

const ListingClient = ({
  listing,
  currentUser,
  reservations = [],
  locationValue,
}: ListingClientProps) => {

  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  // const loginModal = useLoginModal();
  // const router = useRouter();
  // const location = getByValue(locationValue);
  
  // const disabledDates = useMemo(() => {
  //   let dates: Date[] = [];
  //   reservations.forEach((reservation) => {
  //     const range = eachDayOfInterval({
  //       start: new Date(reservation.startDate),
  //       end: new Date(reservation.endDate),
  //     });
  //     dates = [...dates, ...range];
  //   });
  //   return dates;
  // }, [reservations]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(listing.price);
  // const [dateRange, setDateRange] = useState<Range>(initialDateRange);



  // const onCreateReservation = useCallback(() => {
  //   if (!currentUser) {
  //     return loginModal.onOpen();
  //   }
  //   setIsLoading(true);
  //   axios
  //     .post('/api/reservations', {
  //       totalPrice,
  //       startDate: dateRange.startDate,
  //       endDate: dateRange.endDate,
  //       listingId: listing.id,
  //     })
  //     .then(() => {
  //       toast.success('Reservation created successfully');
  //       setDateRange(initialDateRange);
  //       //redirect to accounts
  //       router.push('/trips');
  //     })
  //     .catch(() => {
  //       toast.error('Reservation failed');
  //     });
  // }, [totalPrice, dateRange, listing?.id, router, loginModal, currentUser]);
  


  // useEffect(() => {
  //   if (dateRange.startDate && dateRange.endDate) {
  //     const dayCount = differenceInCalendarDays(
  //       dateRange.endDate,
  //       dateRange.startDate
  //     );
  //     if (dayCount && listing.price) {
  //       setTotalPrice(dayCount * listing.price);
  //     } else {
  //       setTotalPrice(listing.price);
  //     }
  //   }
  // }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  
  return (
    <Container>
      <div className="max-w-screen-4XL mx-auto">
        <div className="flex flex-col gap-12">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
          ">
            <div className="md:col-span-4">
              <ListingInfo
                title={listing.title}
                user={listing.user}
                category={category}
                description={listing.description}
                locationValue={listing.locationValue}
              />
              
            </div>
            <div
              className="
              mb-10
              md:order-last
              md:col-span-3
              ">
              <div className=" md:col-span-3">
                <ListingClientRight 
                  currentUser={currentUser}
                  listing={listing}
                  
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ListingClient;
