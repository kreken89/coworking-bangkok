'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import Container from '../Container';
import CategoryBox from '../CategoryBox';

import { GrLock } from 'react-icons/gr';
import { FaMedal } from 'react-icons/fa';
import { TbToolsKitchen2 } from 'react-icons/tb';
import { CgCoffee } from 'react-icons/cg';
import { CgGym } from 'react-icons/cg';
import { BiSolidDrink } from 'react-icons/bi';

export const categories = [
  {
    label: 'ACTIVITIES',
    icon: FaMedal,
    // description: 'This property has activities!',
  },
  {
    label: 'FOOD AVAILABLE',
    icon: TbToolsKitchen2,
    // description: 'This property has a kitchen!',
  },
  {
    label: 'FREE COFFEE',
    icon: CgCoffee,
    // description: 'This property has a coffee machine!',
  },
  {
    label: 'GYM',
    icon: CgGym,
    // description: 'This property has a gym!',
  },
  {
    label: 'SAFETYBOX',
    icon: GrLock,
    // description: 'This property has safteyboxes!',
  },
  {
    label: 'AFTERWORK',
    icon: BiSolidDrink,
    // description: 'This property has safteyboxes!',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
                bg-rose-200
                rounded-tr-3xl
                rounded-bl-3xl
            ">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
