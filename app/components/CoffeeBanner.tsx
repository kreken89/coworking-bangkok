import React from 'react';
import { PiCoffeeFill } from 'react-icons/pi';

const CoffeeBanner = () => {
  return (
    <div className="flex justify-between items-center bg-banner flex-col md:flex-row">
      <div className="flex justify-center items-center w-1/3">
        {/* White circle container with CoffeeCup image */}
        <div className="w-48 h-48 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full bg-white flex items-center justify-center">
          <div
            className="w-28 h-28 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-no-repeat bg-center bg-cover flex justify-center items-center"
            // style={{ backgroundImage: 'url(/images/CoffeeCup.png)' }}
            >
                <PiCoffeeFill size={60}/>
            </div>
        </div>
      </div>

      <div className="w-2/3 flex justify-center items-center">
        <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-bold text-white">
          Do you <span className="text-yellow">love coffee</span> as much as us?
          Most of our places have
          <span className="text-yellow"> free coffee!</span>
        </h2>
      </div>
    </div>
  );
};

export default CoffeeBanner;
