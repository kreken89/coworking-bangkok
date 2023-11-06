'use client';

import { FaCreditCard } from "react-icons/fa";

const Pricing = () => {
  return (
    <div>
      <div className="flex text-2xl text-lightgray gap-2 font-bold">
        Pricing
        <FaCreditCard size={28} />
      </div>
      <div className="flex flex-col text-lightgray gap-4 mt-4 mb-4">
        <span>300 THB / Day</span>
        <span>1400 THB / Week</span>
        <span>4000 THB / Month</span>
      </div>
    </div>
  );
};

export default Pricing;
