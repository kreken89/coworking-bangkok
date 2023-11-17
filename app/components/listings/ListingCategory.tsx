'use client';

import { IconType } from "react-icons";

interface ListingCategoryProps {
    icon: IconType;
    label: string;
}

const ListingCategory = ({ icon: Icon, label  }: ListingCategoryProps) => {


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-2 border-[1px] mb-1 text-xs rounded-tr-lg rounded-bl-lg p-1 text-semilightgray">
        <Icon size={20} />
        <div className="flex flex-col ">
          <div>
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCategory

