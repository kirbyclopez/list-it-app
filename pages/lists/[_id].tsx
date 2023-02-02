import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  DehydratedState,
  QueryClient,
  UseQueryResult,
  dehydrate,
  useQuery,
} from 'react-query';
import Footer from '../../components/layouts/footer/Footer';
import Header from '../../components/layouts/header/Header';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import { instance } from '../../lib/axios';
import { IItem } from '../../lib/interfaces/item.interface';
import { IList } from '../../lib/interfaces/list.interface';
import { fetchItems } from '../../lib/services/item.service';
import { fetchList } from '../../lib/services/list.service';
import { NextPageWithLayout } from '../page';

const List: NextPageWithLayout<IList> = () => {
  const router = useRouter();
  const { _id } = router.query;

  const {
    isError: isListError,
    error: listError,
    data: list,
  }: UseQueryResult<IList, Error> = useQuery<IList, Error>(
    ['list', _id],
    ({ queryKey }) => fetchList(queryKey[1] as string)
  );

  const {
    isLoading: _isItemsLoading,
    isError: _isItemsError,
    error: _itemsError,
    data: _items,
  }: UseQueryResult<IItem[], Error> = useQuery<IItem[], Error>(
    ['items', _id],
    ({ queryKey }) => fetchItems(queryKey[1] as string)
  );

  if (isListError)
    return (
      <h1 className="w-full text-center text-xl font-medium">
        Error: {listError.message}
      </h1>
    );

  return (
    <>
      <Head>
        <title>List It | Items</title>
      </Head>
      <div className="flex flex-col flex-1 items-center">
        <div className="max-w-xl w-full mx-auto my-10 bg-white p-8 rounded-xl space-y-6 shadow shadow-slate-300">
          <h1 className="text-center text-3xl font-medium">{list?.name}</h1>
        </div>
      </div>
    </>
  );
};

export default List;

List.getLayout = (page) => {
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
  const id = context.params?._id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['list', id], async () => {
    const res = await instance.get(`/api/lists/${id}`, {
      withCredentials: true,
      headers: {
        cookie: cookies,
      },
    });

    return res.data;
  });

  await queryClient.prefetchQuery('items', async () => {
    const res = await instance.get(`/api/lists/${id}/items`, {
      withCredentials: true,
      headers: {
        cookie: cookies,
      },
    });

    return res.data;
  });

  return { props: { dehydratedState: dehydrate(queryClient) } };
};
