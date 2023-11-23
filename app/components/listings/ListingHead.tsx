'use client';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import { useState } from 'react';

interface ListingHeadProps {
  title?: string;
  locationValue: string;
  imageSrc: string[];
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  const [mainImage, setMainImage] = useState(imageSrc[0]);
  
  const handleImageClick = (image: string) => setMainImage(image);

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-center gap-x-1 overflow-hidden rounded-bl-3xl rounded-tr-3xl custom-listing-border-radius">
        <div className=" w-full h-[30vh] md:h-[30.4vh] overflow-hidden relative mb-1 mxs:h-[20vh]">
          
            <Image
              alt="Property Image"
              src={mainImage}
              fill              
              className="object-cover "
              sizes="(max-width: 640px) 100vw, 640px"
              priority
            />
            {/* <div className="absolute top-5 right-5">
              <HeartButton listingId={id} currentUser={currentUser} />
            </div> */}
          
        </div>

        <div className="flex flex-row md:flex-col gap-1 ">
          <div className="flex gap-1">
            {imageSrc.slice(1, 3).map((image, index) => (
              <div
                key={index}
                className=" mxs:w-[21vw] mxs:h-[10vh] xs:w-[22vw] xs:h-[15vh] sm:w-[24vw] sm:h-[15vh] md:w-[15vw] md:h-[15vh] h-[15vh] w-[20vw] overflow-hidden relative "
                onClick={() => handleImageClick(image)}>
                <Image
                  alt={`Image ${index}`}
                  src={image}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 640px"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-1 ">
            {imageSrc.slice(3, 5).map((image, index) => (
              <div
                key={index}
                className=" mxs:w-[21vw] mxs:h-[10vh] xs:w-[22vw] xs:h-[15vh] sm:w-[23vw] sm:h-[15vh] md:w-[15vw] md:h-[15vh] h-[15vh] w-[20vw] overflow-hidden relative"
                onClick={() => handleImageClick(image)}>
                <Image
                  alt={`Image ${index}`}
                  src={image}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 640px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingHead;

