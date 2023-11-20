'use client';

import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';

const Ratings = () => {
  return (
    <div className="font-poppins">
      <div className="flex text-twentyfour text-lightgray gap-2 font-bold mt-4">
        Reviews
        <IoChatbubbleEllipsesSharp size={28} />
      </div>
      <div className="flex flex-col text-lightgray gap-4 mt-4 mb-4">
        <span>⭐️⭐️⭐️⭐️⭐️</span>
        <p className="italic font-light">
          Central Bangkok coworking space: Vibrant atmosphere, modern amenities,
          prime location. Excellent facilities for productivity, collaborative
          environment. Convenient for networking, surrounded by cafes and
          transport options. Overall, a top-notch workspace in the heart of the
          city.
        </p>
      </div>
      <div className="flex flex-col text-lightgray gap-4 mt-4 mb-4">
        <span>⭐️⭐️⭐️⭐️⭐️</span>
        <p className="italic font-light">
          A sleek coworking oasis in the city center. Stylish design, high-speed
          internet, and diverse workspaces. Friendly community, perfect for
          freelancers and startups. Central location with easy access to public
          transport. A premium choice for professionals in Bangkok.
        </p>
      </div>
    </div>
  );
};

export default Ratings;
