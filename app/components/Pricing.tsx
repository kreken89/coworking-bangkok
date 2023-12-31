'use client';

import { FaCreditCard } from "react-icons/fa";
import { SafeListing } from "../types";

interface PricingProps {
  data: SafeListing;
}

const Pricing = ({ data }: PricingProps) => {

  // Function to calculate the discounted price for a week
  const calculateWeeklyPrice = (price: number) => {
    return Math.floor(price * 7 * 0.9); // 10% discount
  };
  // Function to calculate the discounted price for 28 days
  const calculateMonthlyPrice = (price: number) => {
    return Math.floor(price * 28 * 0.75); // 10% discount for a week + 10% discount for a month
  };

  return (
    <div className="font-poppins">
      <div className="flex items-center text-twentyfour text-lightgray gap-2 font-bold">
        Pricing <FaCreditCard size={28} />
      </div>
      <div className="flex flex-col text-lightgray gap-4 mt-4 mb-4">
        <span>{data.price} THB / Day</span>
        <div>
          {calculateWeeklyPrice(data.price)} THB / Week{' '}
          <span className="text-red border-2 px-1 rounded-tr-lg rounded-bl-lg">
            10%
          </span>{' '}
        </div>
        <div>
          {calculateMonthlyPrice(data.price)} THB / Four Weeks{' '}
          <span className="text-red border-2 px-1 rounded-tr-lg rounded-bl-lg">25%</span>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
