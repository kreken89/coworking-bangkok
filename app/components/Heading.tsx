'use client';

import { FaRegEnvelope } from 'react-icons/fa';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  icon?: React.ReactNode;
}

const Heading = ({ title, subtitle, center, icon }: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className=" sm:text-fortyeight md:text-sixty font-bold font-poppins text-darkgray">
        {title}
      </div>
      <div className="flex items-center text-custombase text-lightgray mt-2">
        {icon && <span className="mr-2">{icon}</span>} {subtitle}
      </div>

      {/* <div className="flex gap-2">
          <FaRegEnvelope size={16} className="mt-1 text-lightgray" />
          <span className="flex text-custombase text-lightgray">
            bookings@coworkingbangkok.com
          </span>
        </div> */}
    </div>
  );
};

export default Heading;
