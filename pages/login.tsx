import Head from 'next/head';
import LoginForm from '../components/forms/login-form/LoginForm';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Login: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>AppName | Login</title>
      </Head>
      <LoginForm />
    </>
  );
};

export default Login;

Login.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
