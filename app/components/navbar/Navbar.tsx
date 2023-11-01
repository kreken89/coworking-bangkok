'use client';

import Container from '../Container'
import HomeLogo from './HomeLogo';
import Logo from './Logo'
import Search from './Search';
import UserMenu from './UserMenu';
import { BiSolidHome } from 'react-icons/bi';
import { SafeUser } from '@/app/types';
import Categories from './Categories';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {


  return (
    <div className="fixed w-full z-10">
      <div
        className="
        py-4
        ">
        <Container>
          <div
            className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
            ">
            {/* <Logo /> */}
            <HomeLogo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar