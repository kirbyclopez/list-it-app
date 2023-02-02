import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { instance } from '../../../lib/axios';
import logo from '../../../public/images/list-it-logo-primary-sm.png';

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ ...headerProps }) => {
  const handleLogout = async () => {
    await instance.delete('/api/auth/sessions', {
      withCredentials: true,
    });

    Router.push('/login');
  };

  return (
    <header
      {...headerProps}
      className="header sticky top-0 bg-white shadow-md px-2 sm:px-8"
    >
      <div className="flex items-center justify-between m-auto max-w-6xl">
        <h1 className="flex-1 text-lg sm:text-2xl py-2">
          <Link href="/" className="flex flex-row items-center space-x-3">
            <Image
              src={logo}
              alt="List It Logo"
              height={40}
              width={40}
              className="inline"
            />
            <span className="font-marko-one">List It</span>
          </Link>
        </h1>
        <div className="justify-end">
          <button
            onClick={handleLogout}
            className="transition duration-200 bg-white hover:bg-green-800 border-[1px] border-green-700 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-green-700 hover:text-white focus:text-white px-4 py-2 md:py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            <span className="text-xs sm:text-sm">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
