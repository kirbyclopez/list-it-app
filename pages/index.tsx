import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { QueryClient, UseQueryResult, useQuery } from 'react-query';
import { DehydratedState, dehydrate } from 'react-query/hydration';
import Footer from '../components/layouts/footer/Footer';
import Header from '../components/layouts/header/Header';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import TodoListCrud from '../components/lists/todo-list-crud/TodoListCrud';
import { ITodoListItem } from '../components/lists/todo-list-item/TodoListItem';
import { instance } from '../lib/axios';
import { NextPageWithLayout } from './page';

export const fetchLists = async () => {
  const res = await instance.get('/api/lists', {
    withCredentials: true,
  });

  return res.data;
};

const Home: NextPageWithLayout = () => {
  const {
    isLoading,
    isError,
    error,
    data,
  }: UseQueryResult<ITodoListItem[], Error> = useQuery<ITodoListItem[], Error>(
    'lists',
    fetchLists
  );

  return (
    <>
      <Head>
        <title>List It | Dashboard</title>
      </Head>
      <div className="flex flex-col flex-1 items-center">
        {isLoading && <p>Getting lists...</p>}
        {isError && <p>Error is -- {error?.message}</p>}
        <TodoListCrud lists={data || []} />
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

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const cookies = context.req.headers.cookie;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('lists', async () => {
    const res = await instance.get('/api/lists', {
      withCredentials: true,
      headers: {
        cookie: cookies,
      },
    });

    return res.data;
  });
  return { props: { dehydratedState: dehydrate(queryClient) } };
};
