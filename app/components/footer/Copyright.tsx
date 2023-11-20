'use client';

import { FaRegCopyright } from 'react-icons/fa';

const Copyright = () => {
  return (
    <div className="text-custom-small sm:text-twentyfour font-poppins font-light flex justify-center items-center gap-2 ">
      <FaRegCopyright size={24} />
      <span>CO-WORKING Bangkok 2023</span>
    </div>
  );
}

export default Copyright