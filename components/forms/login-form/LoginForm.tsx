import Image from 'next/image';
import Router from 'next/router';
import { useState } from 'react';
import { instance } from '../../../lib/axios';
import logo from '../../../public/images/list-it-logo-primary.png';
import InputBox from '../input-box/InputBox';

export interface ILoginForm {}

const LoginForm: React.FC<ILoginForm> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const credentials = { username, password };

    await instance.post('/api/auth/login', credentials, {
      withCredentials: true,
    });

    Router.push('/');
  };

  return (
    <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-sm mt-6 sm:mt-20 md:mt-40 flex flex-col items-center space-y-6">
      <div className="relative w-[120px] sm:w-[150px] h-[120px] sm:h-[150px]">
        <Image src={logo} alt="List It Logo" fill={true} />
      </div>
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
              className="mt-1 mb-5"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <InputBox
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="********"
              className="mt-1 mb-5"
            />
            <button
              type="submit"
              className="transition duration-200 bg-green-700 hover:bg-green-800 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-700 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Sign in</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
