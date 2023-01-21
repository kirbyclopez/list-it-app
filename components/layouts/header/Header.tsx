import axios from 'axios';
import Image from 'next/image';
import Router from 'next/router';
import baseUrl from '../../../lib/baseUrl';
import logo from '../../../public/images/list-it-logo-primary-sm.png';

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ ...headerProps }) => {
  const handleLogout = async () => {
    await axios.delete(`${baseUrl}/api/auth/sessions`, {
      withCredentials: true,
    });

    Router.push('/login');
  };

  return (
    <header
      {...headerProps}
      className="header sticky top-0 bg-white shadow-md px-8"
    >
      <div className="flex items-center justify-between m-auto max-w-6xl">
        <h1 className="w-3/12 text-2xl py-2">
          <a href="/" className="flex flex-row items-center space-x-3">
            <Image
              src={logo}
              alt="List It Logo"
              height={40}
              width={40}
              className="inline"
            />
            <span className="font-marko-one">List It</span>
          </a>
        </h1>
        <div className="w-3/12 flex justify-end">
          <button
            onClick={handleLogout}
            className="transition duration-200 bg-white hover:bg-green-800 border-[1px] border-green-700 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-green-700 hover:text-white focus:text-white px-4 py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
