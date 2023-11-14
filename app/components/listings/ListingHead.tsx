'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { IoLocationOutline } from 'react-icons/io5';


interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead = ({ title, locationValue, imageSrc, id, currentUser }: ListingHeadProps) => {

    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

  return (
    <>
      <div
        className="
        w-full
        h-[30vh]
        overflow-hidden
        rounded-tr-3xl
        rounded-bl-3xl
        relative
        
        ">
        <Image alt="Image" src={imageSrc} fill className="object-cover" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>

      {/* <Heading
        title={title}
        icon={<IoLocationOutline size={16} className="text-semilightgray" />}
        subtitle={`${location?.region}, ${location?.label}`}
      /> */}
    </>
  );
}

export default ListingHead