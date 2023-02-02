import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  DehydratedState,
  QueryClient,
  UseQueryResult,
  dehydrate,
  useQuery,
} from 'react-query';
import AddItemForm from '../../components/forms/add-item-form/AddItemForm';
import TodoItems from '../../components/items/todo-items/TodoItems';
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
    isLoading: isItemsLoading,
    isError: isItemsError,
    error: itemsError,
    data: items,
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
        <div className="max-w-xl w-full mx-auto my-4 sm:my-10 bg-white p-4 sm:p-8 rounded-none sm:rounded-xl space-y-3 sm:space-y-6 shadow shadow-slate-300">
          <div className="flex flex-row relative">
            <Link
              href="/"
              className="absolute left-0 top-0 sm:top-1 text-slate-500 hover:text-green-600"
            >
              <i className="fa-solid fa-chevron-left text-lg sm:text-xl"></i>
            </Link>
            <h1 className="flex-1 text-center text-xl sm:text-2xl font-medium">
              {list?.name}
            </h1>
          </div>
          <AddItemForm listId={list?._id as string} />
          <TodoItems
            items={items || []}
            isLoading={isItemsLoading}
            isError={isItemsError}
            error={itemsError?.message || ''}
          />
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

  await queryClient.prefetchQuery(['items', id], async () => {
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
