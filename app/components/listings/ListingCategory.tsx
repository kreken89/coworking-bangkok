'use client';

import { IconType } from "react-icons";

interface ListingCategoryProps {
    icon: IconType;
    label: string;
}

const ListingCategory = ({ icon: Icon, label  }: ListingCategoryProps) => {


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-2">
        <Icon size={16} className="text-semilightgray" />
        <div className="flex flex-col">
          <div className="text-semilightgray text-custombase font-semibold">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCategory

