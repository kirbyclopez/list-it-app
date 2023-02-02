import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { QueryClient, UseQueryResult, useQuery } from 'react-query';
import { DehydratedState, dehydrate } from 'react-query/hydration';
import AddListForm from '../components/forms/add-list-form/AddListForm';
import Footer from '../components/layouts/footer/Footer';
import Header from '../components/layouts/header/Header';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { ITodoListItem } from '../components/lists/todo-list-item/TodoListItem';
import TodoLists from '../components/lists/todo-lists/TodoLists';
import { instance } from '../lib/axios';
import { fetchLists } from '../lib/services/list.service';
import { NextPageWithLayout } from './page';

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
        <title>List It | Task Lists</title>
      </Head>
      <div className="flex flex-col flex-1 items-center">
        <div className="max-w-xl w-full mx-auto my-10 bg-white p-8 rounded-xl space-y-6 shadow shadow-slate-300">
          <h1 className="text-center text-3xl font-medium">My Lists</h1>
          <AddListForm />
          <TodoLists
            lists={data || []}
            isLoading={isLoading}
            isError={isError}
            error={error?.message || ''}
          />
        </div>
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
