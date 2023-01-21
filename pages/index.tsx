import Head from 'next/head';
import Footer from '../components/layouts/footer/Footer';
import Header from '../components/layouts/header/Header';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import TodoListCrud from '../components/lists/todo-list-crud/TodoListCrud';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>List It | Dashboard</title>
      </Head>
      <div className="flex flex-col flex-1 items-center">
        <TodoListCrud lists={[]} />
      </div>
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <Header />
      {page}
      <Footer />
    </PrimaryLayout>
  );
};
