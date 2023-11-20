'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import Heading from "../Heading";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";

const Map = dynamic(() => import('../Map'), {
    ssr: false,
});

interface ListingInfoProps {
  title: string;
  user: SafeUser;
  description?: string;
  categories?:
    | Array<{
        icon: IconType;
        label: string;
      }>
    | undefined;
  locationValue: string;
}

const ListingInfo = ({
  title,
  user,
  description,
  categories,
  locationValue,
}: ListingInfoProps) => {

  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  const location = getByValue(locationValue);

  return (
    <div className=" col-span-4 flex flex-col gap-2 font-poppins font-light">
      <Heading
        title={title}
        icon={<IoLocationOutline size={16} className="text-semilightgray" />}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className="flex gap-2 mb-4 ">
        <FaRegEnvelope size={16} className="mt-1 text-lightgray" />
        <span className="flex text-custombase text-lightgray">
          bookings@coworkingbangkok.com
        </span>
      </div>

      {/* Render categories */}
      <div className="flex flex-wrap gap-2 font-rajdhani font-semibold">
        {categories &&
          categories.length > 0 &&
          categories.map((category, index) => (
            <div key={index}>
              <ListingCategory icon={category.icon} label={category.label} />
            </div>
          ))}
      </div>
      

      <div className="text-lg font-light text-gray">{description}</div>
    </div>
  );
};

export default ListingInfo
