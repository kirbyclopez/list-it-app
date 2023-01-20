import axios from 'axios';
import Router from 'next/router';
import baseUrl from '../../../lib/baseUrl';

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
      className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02"
    >
      <h1 className="w-3/12 text-lg py-3">
        <a href="">List It</a>
      </h1>
      <div className="w-3/12 flex justify-end">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
