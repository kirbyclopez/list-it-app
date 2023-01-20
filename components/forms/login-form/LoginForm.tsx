import axios from 'axios';
import Image from 'next/image';
import Router from 'next/router';
import { useState } from 'react';
import baseUrl from '../../../lib/baseUrl';
import logo from '../../../public/images/list-it-logo-primary.png';
import InputBox from '../input-box/InputBox';

export interface ILoginForm {}

const LoginForm: React.FC<ILoginForm> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const credentials = { username, password };

    await axios.post(`${baseUrl}/api/auth/login`, credentials, {
      withCredentials: true,
    });

    Router.push('/');
  };

  return (
    <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-sm mt-2 md:mt-40 flex flex-col items-center space-y-6">
      <Image src={logo} alt="List It Logo" height={150} />
      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div className="px-5 py-7">
          <form onSubmit={handleSubmit}>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Username
            </label>
            <InputBox
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              placeholder="user@email.com"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <InputBox
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="********"
            />
            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Login</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
