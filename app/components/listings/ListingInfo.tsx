'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import Heading from "../Heading";
import { IoLocationOutline } from "react-icons/io5";

const Map = dynamic(() => import('../Map'), {
    ssr: false,
});

interface ListingInfoProps {
    title: string;
    user: SafeUser;
    description?: string;
    category: {
        icon: IconType;
        label: string;
    } | undefined
    locationValue: string;
}

const ListingInfo = ({ title, user, description, category, locationValue }: ListingInfoProps) => {

        const { getByValue } = useCountries();
        const coordinates = getByValue(locationValue)?.latlng;
        const location = getByValue(locationValue);

  return (
    <div className=" col-span-4 flex flex-col gap-8">
      <Heading
        title={title}
        icon={<IoLocationOutline size={16} className="text-semilightgray" />}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className="border-[1px] w-[fit-content] rounded-tr-lg rounded-bl-lg p-1">
        {category && (
          <ListingCategory icon={category.icon} label={category.label} />
        )}
      </div>

      <div className="text-lg font-light text-gray">{description}</div>
      {/* <Map center={coordinates} /> */}
    </div>
  );
}

export default ListingInfo