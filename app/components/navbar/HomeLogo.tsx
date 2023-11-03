'use client';

import { useRouter } from 'next/navigation';
import { BiSolidHome } from 'react-icons/bi';

const HomeLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/')}
      className="
          
            bg-lightestGray
            p-4
            md_py-1
            md_px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            ">
      <BiSolidHome className="react-icon-computer" />
    </div>
  );
};

export default HomeLogo;
